import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupDto } from '@bunch/groups/common';

import { GroupEntity } from './group.entity';
import { GroupCreateForm } from './group.form';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(GroupEntity) private readonly repository: Repository<GroupEntity>) {}

  async count(owner?: string): Promise<number> {
    return this.repository.count({ where: { owner } });
  }

  async find(owner?: string): Promise<GroupEntity[]> {
    return this.repository.find({ where: { owner }, relations: ['cards'] });
  }

  async findOne(uuid: string): Promise<GroupEntity | null> {
    return this.repository.findOneBy({ uuid });
  }

  async findOneWithCards(uuid: string, owner?: string): Promise<GroupEntity | null> {
    return this.repository.findOne({ where: { uuid, owner }, relations: ['cards'] });
  }

  async create(group: GroupCreateForm): Promise<GroupEntity> {
    const order = await this.count(group.owner);

    return this.repository.save({ ...group, order, cards: undefined });
  }

  async update(uuid: string, data: Partial<GroupEntity>): Promise<void> {
    return this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return this.repository.delete({ uuid }).then();
  }

  async save(group: Omit<GroupEntity, 'cards'>): Promise<GroupEntity> {
    return this.repository.save(group);
  }

  async sync(owner: string, groups: GroupDto[]): Promise<GroupEntity[]> {
    await this.repository.save(groups.map((group) => ({ ...group, cards: undefined })));

    return this.find(owner);
  }
}
