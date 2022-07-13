import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardGroupEntity } from './card-group.entity';
import { CardGroupCreateForm } from './card-group-create.form';

@Injectable()
export class CardGroupService {
  constructor(@InjectRepository(CardGroupEntity) private readonly cardGroupRepository: Repository<CardGroupEntity>) {}

  async find(): Promise<CardGroupEntity[]> {
    return await this.cardGroupRepository.find();
  }

  async findOne(id: number): Promise<CardGroupEntity | null> {
    return await this.cardGroupRepository.findOneBy({ id });
  }

  async create(cardGroup: CardGroupCreateForm): Promise<CardGroupEntity> {
    const newCardGroup = await this.cardGroupRepository.create(cardGroup);

    return this.cardGroupRepository.save(newCardGroup);
  }

  async update(id: number, data: Partial<CardGroupEntity>): Promise<void> {
    return await this.cardGroupRepository.update({ id }, data).then();
  }
}
