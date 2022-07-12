import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardEntity } from './card.entity';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {}

  async find(): Promise<CardEntity[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: number): Promise<CardEntity | null> {
    return await this.cardRepository.findOneBy({ id });
  }

  async create(card: Partial<CardEntity>): Promise<CardEntity> {
    const newCard = await this.cardRepository.create(card);

    return this.cardRepository.save(newCard);
  }

  async update(id: number, data: Partial<CardEntity>): Promise<void> {
    return await this.cardRepository.update({ id }, data).then();
  }
}
