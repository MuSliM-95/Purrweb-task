import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { cardDto } from './dto/card.dto';
import { Request } from 'express';
import { UserVerification } from 'src/guard/verification.guard';
import { IParamsData } from 'src/types/global.type';

@Controller('cards')
export class CardsController {
  constructor(public readonly cardsService: CardsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  addCard(@Body(new ValidationPipe()) cardDto: cardDto, @Req() req: Request) {
    const { userId } = req.cookies;
    return this.cardsService.createCard({ ...cardDto, userId });
  }

  @Patch('update/:userId/:id')
  @UseGuards(AuthGuard, UserVerification)
  updateCard(@Body(new ValidationPipe()) cardDto: cardDto, @Param() params: IParamsData) {
    console.log(params);
    
    return this.cardsService.updateCard(cardDto, +params.id);
  }

  @Get(':id') 
  getCard(@Param('id') id: number)  {
    return this.cardsService.findOneCard(id)
  }

  @Get()
  getAllCards() {
    return this.cardsService.findAllCards();
  }

  @Delete('delete/:userId/:id')
  @UseGuards(AuthGuard, UserVerification)
  deleteCard(@Param('id') id: number ) {
      return this.cardsService.removeCard(id)
  }
}
