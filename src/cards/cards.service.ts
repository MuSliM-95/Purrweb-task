import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { cardDto } from './dto/card.dto';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY') public readonly useRepository: typeof Card,
  ) {}

  async createCard({ title, columnId, userId }: cardDto): Promise<Card> {
    return  await this.useRepository.create({
      userId,
      title,
      columnId,
    });
  }

  async updateCard({ title }: cardDto, id: number): Promise<Card> {
    const card = await this.useRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Карточка с ${id} не найдена`);
    }

    await card.update({
      title,
    });

    await card.save();

    return card;
  }

  async findOneCard(id: number): Promise<Card> {
    const card = await this.useRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Карточка с ${id} не найдена`);
    }

    return card;
  }


  async findAllCards(): Promise<Card[]> {
    return await this.useRepository.findAll()
  }

  async removeCard(id: number): Promise<number> {
     return await this.useRepository.destroy({where: { id } });
  }
}
