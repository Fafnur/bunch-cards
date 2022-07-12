import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardController } from './card.controller';
import { CardEntity } from './card.entity';
import { CardService } from './card.service';

@Module({
  controllers: [CardController],
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
