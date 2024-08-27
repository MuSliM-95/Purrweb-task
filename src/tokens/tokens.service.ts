import { Inject, Injectable } from '@nestjs/common';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @Inject('TOKENS_REPOSITORY') private useRepository: typeof Token,
  ) {}

  async saveRefreshToken(refreshToken: string, id: number): Promise<Token> {
    const token = await this.useRepository.findOne({ where: { userId: id } });

    if (token) {
      await token.update({
        refreshToken: refreshToken,
      }); 
      return await token.save();
    }

    const createToken = await this.useRepository.create({
      userId: id,
      refreshToken,
    });

    return createToken;
  }
}
