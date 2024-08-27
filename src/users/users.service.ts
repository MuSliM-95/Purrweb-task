import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { Response } from 'express';

export interface IUserData {
  user: UserDto;
  refreshToken: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async createUser({ email, password, role = 'user' }): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException(
        `Пользователь с таким ${email} уже существует.`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = await this.usersRepository.create({
      email,
      password: hashPassword,
      role: role
    } );

    const userDto = new UserDto(userData)

    return userDto
  }

  async signIn({ email, password }: UserDto): Promise<IUserData> {
    const user = await this.usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new BadRequestException('Неверный пароль');
    }

    const payload = { userId: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
    });

    await this.tokensService.saveRefreshToken(refreshToken, user.id);

    const dto = new UserDto(user, accessToken);

    return {
      user: dto,
      refreshToken,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll({attributes: {exclude: ['password']}});
  }

  async getUserData(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id }, 
      attributes: {exclude: ['password']}
     });
  }

  async updateUser(userDto: UserUpdateDto, id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException(`Пользователь c id: ${id} не найден`);
    }

    user.update({
      role: userDto.role,
    });

    user.save();
    const data = new UserDto(user);

    return data;
  }

  async deleteUser(id: number): Promise<number> {
    const user = await this.usersRepository.destroy({ where: { id } });

    if(!user) {
       throw new BadRequestException("Непредвиденная ошибка!")
    }

    return user;
  }

  saveUserDataInCookies(data: IUserData, res: Response) {
    res.cookie('refreshToken', data?.refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.cookie('userId', data?.user.id, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000  })
    res.cookie('role', data?.user.role, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000  })
  }

}
