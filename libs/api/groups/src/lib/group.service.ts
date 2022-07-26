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

  async findOne(uuid: string): Promise<GroupEntity | null> {
    return await this.repository.findOneBy({ uuid });
  }

  async findOneWithCards(uuid: string, owner?: number): Promise<GroupEntity | null> {
    return await this.repository.findOne({ where: { uuid, owner }, relations: ['cards'] });
  }

  async create(cardGroup: GroupCreateForm): Promise<GroupEntity> {
    const groups = await this.find(cardGroup.owner);
    const newCardGroup = await this.repository.create({ ...cardGroup, order: groups.length });

    return this.repository.save(newCardGroup);
  }

  async update(uuid: string, data: Partial<GroupEntity>): Promise<void> {
    return await this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return await this.repository.delete({ uuid }).then();
  }

  async save(cardGroup: GroupEntity): Promise<void> {
    return await this.repository.save(cardGroup).then();
  }
}
