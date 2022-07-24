import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardEntity } from './card.entity';
import { CardCreateForm } from './card.form';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {}

  async find(owner?: number): Promise<CardEntity[]> {
    return await this.cardRepository.find({ where: { owner } });
  }

  async findOne(id: number): Promise<CardEntity | null> {
    return await this.cardRepository.findOneBy({ id });
  }

  async create(card: CardCreateForm): Promise<CardEntity> {
    const newCard = await this.cardRepository.create(card);

    return await this.cardRepository.save(newCard);
  }

  async update(id: number, data: Partial<CardEntity>): Promise<void> {
    return await this.cardRepository.update({ id }, data).then();
  }

  async delete(id: number): Promise<void> {
    return await this.cardRepository.delete({ id }).then();
  }
}
