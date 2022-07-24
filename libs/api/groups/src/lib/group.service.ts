import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from './group.entity';
import { GroupCreateForm } from './group.form';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(GroupEntity) private readonly repository: Repository<GroupEntity>) {}

  async find(owner?: number): Promise<GroupEntity[]> {
    return await this.repository.find({ where: { owner }, relations: ['cards'] });
  }

  async findOne(id: number): Promise<GroupEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneWithCards(id: number, owner?: number): Promise<GroupEntity | null> {
    return await this.repository.findOne({ where: { id, owner }, relations: ['cards'] });
  }

  async create(cardGroup: GroupCreateForm): Promise<GroupEntity> {
    const newCardGroup = await this.repository.create(cardGroup);

    return this.repository.save(newCardGroup);
  }

  async update(id: number, data: Partial<GroupEntity>): Promise<void> {
    return await this.repository.update({ id }, data).then();
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete({ id }).then();
  }

  async save(cardGroup: GroupEntity): Promise<void> {
    return await this.repository.save(cardGroup).then();
  }
}
