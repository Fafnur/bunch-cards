import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import { GroupEntity } from './group.entity';
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
