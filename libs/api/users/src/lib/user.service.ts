import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async find(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(uuid: string): Promise<UserEntity | null> {
    return (await this.userRepository.findOneBy({ uuid })) ?? null;
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findBy({ username });

    return users.length === 1 ? users[0] : null;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findBy({ email });

    return users.length === 1 ? users[0] : null;
  }

  async findOneByReset(reset: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findBy({ reset });

    return users.length === 1 ? users[0] : null;
  }

  async findOneByConfirmToken(confirm: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findBy({ confirm });

    return users.length === 1 ? users[0] : null;
  }

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = await this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async update(uuid: string, data: Partial<UserEntity>): Promise<void> {
    return await this.userRepository.update({ uuid }, data).then();
  }
}
