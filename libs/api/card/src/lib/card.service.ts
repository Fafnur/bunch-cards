import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { CardGroupEntity } from '@bunch/api/card-groups';
import { CardEntity } from './card.entity';
import { CardCreateForm } from './card-create.form';

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {}

  async find(): Promise<CardEntity[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: number): Promise<CardEntity | null> {
    return await this.cardRepository.findOneBy({ id });
  }

  async create(card: CardCreateForm): Promise<CardEntity> {
    const newCard = await this.cardRepository.create(card);
    const cardSaved = await this.cardRepository.save(newCard);

    // if (card.group) {
    //   const group = await this.cardGroupRepository.findOneBy({ id: card.group });
    //   if (group) {
    //     group.cards = [...group.cards, cardSaved];
    //     await this.cardGroupRepository.save(group);
    //   }
    // }

    return cardSaved;
  }

  async update(id: number, data: Partial<CardEntity>): Promise<void> {
    return await this.cardRepository.update({ id }, data).then();
  }
}
