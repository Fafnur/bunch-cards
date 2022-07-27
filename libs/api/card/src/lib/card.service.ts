import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardEntity } from './card.entity';
import { CardCreateForm } from './card.form';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly repository: Repository<CardEntity>) {}

  async count(owner?: number): Promise<number> {
    return await this.repository.count({ where: { owner } });
  }

  async find(owner?: number): Promise<CardEntity[]> {
    return await this.repository.find({ where: { owner } });
  }

  async findOne(uuid: string): Promise<CardEntity | null> {
    return await this.repository.findOneBy({ uuid });
  }

  async create(card: CardCreateForm): Promise<CardEntity> {
    const newCard = await this.repository.create(card);

    return await this.repository.save(newCard);
  }

  async update(uuid: string, data: Partial<CardEntity>): Promise<void> {
    return await this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return await this.repository.delete({ uuid }).then();
  }

  async save(card: CardEntity): Promise<void> {
    return await this.repository.save(card).then();
  }
}
