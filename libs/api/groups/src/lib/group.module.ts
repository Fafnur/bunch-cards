import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardModule } from '@bunch/api/card';

import { GroupController } from './group.controller';
import { GroupEntity } from './group.entity';
import { GroupListener } from './group.listener';
import { GroupService } from './group.service';

@Module({
  controllers: [GroupController],
  imports: [TypeOrmModule.forFeature([GroupEntity]), CardModule],
  providers: [GroupService, GroupListener],
  exports: [GroupService],
})
export class GroupModule {}
