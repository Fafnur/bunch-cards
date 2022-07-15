import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardModule } from '@bunch/api/card';

import { CardGroupController } from './card-group.controller';
import { CardGroupEntity } from './card-group.entity';
import { CardGroupService } from './card-group.service';

@Module({
  controllers: [CardGroupController],
  imports: [TypeOrmModule.forFeature([CardGroupEntity]), CardModule],
  providers: [CardGroupService],
  exports: [CardGroupService],
})
export class CardGroupModule {}
