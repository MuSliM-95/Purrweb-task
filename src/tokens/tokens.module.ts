import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { tokensProvider } from './tokens.providers';


@Module({
  providers: [TokensService, ...tokensProvider],
  exports: [TokensService]
})
export class TokensModule {}
