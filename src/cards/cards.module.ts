import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { cardsProviders } from './cards.providers';


@Module({
  providers: [CardsService, ...cardsProviders],
  controllers: [CardsController]
})
export class CardsModule {}
