import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupDto } from '@bunch/groups/common';

import { GroupEntity } from './group.entity';
import { GroupCreateForm } from './group.form';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(GroupEntity) private readonly repository: Repository<GroupEntity>) {}

  async count(owner?: number): Promise<number> {
    return await this.repository.count({ where: { owner } });
  }

  async find(owner?: number): Promise<GroupDto[]> {
    return await this.repository.find({ where: { owner }, relations: ['cards'] });
  }

  async findOne(uuid: string): Promise<GroupDto | null> {
    return await this.repository.findOneBy({ uuid });
  }

  async findOneWithCards(uuid: string, owner?: number): Promise<GroupDto | null> {
    return await this.repository.findOne({ where: { uuid, owner }, relations: ['cards'] });
  }

  async create(group: GroupCreateForm): Promise<GroupDto> {
    const count = await this.count(group.owner);
    const newCardGroup = await this.repository.create({ ...group, order: count, cards: undefined });

    return this.repository.save(newCardGroup);
  }

  async update(uuid: string, data: Partial<GroupDto>): Promise<void> {
    return await this.repository.update({ uuid }, data).then();
  }

  async delete(uuid: string): Promise<void> {
    return await this.repository.delete({ uuid }).then();
  }

  async save(group: GroupEntity): Promise<GroupDto> {
    return await this.repository.save(group);
  }

  async sync(owner: number, groups: GroupDto[]): Promise<GroupDto[]> {
    await this.repository.save(groups.map((group) => ({ ...group, cards: undefined })));

    return await this.find(owner);
  }
}
