import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/guard/roles.guard';

interface UserParams {
  id: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Get('all')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param() params: UserParams): Promise<User> {
     const user = await this.usersService.getUserData(params.id)
     return user
  }
 
  @Post('signUp')
  async addUser(@Body(new ValidationPipe()) userDto: UserDto, @Res() res: Response): Promise<Response> {
      const user = await this.usersService.createUser(userDto);
      return res.json(user)
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) userDto: UserDto, @Res() res: Response): Promise<Response> {
      const data = await this.usersService.signIn(userDto);
            
      this.usersService.saveUserDataInCookies(data, res);
      
      return res.json(data?.user)
  }
  
  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(@Param() params: UserParams,  @Body(new ValidationPipe()) userDto: UserUpdateDto ): Promise<UserDto> {
    return this.usersService.updateUser(userDto, params?.id)
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
 async  removeUser(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { userId } = req.cookies
    const data = await this.usersService.deleteUser(userId);
    return  res.json(data) 
  }
}
