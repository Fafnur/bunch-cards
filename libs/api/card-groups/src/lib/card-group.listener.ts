import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CardCreatedEvent, CardEvents } from '@bunch/api/card';

import { CardGroupService } from './card-group.service';

@Injectable()
export class CardGroupListener {
  constructor(private readonly cardGroupService: CardGroupService) {}

  @OnEvent(CardEvents.Created)
  async handleOrderCreatedEvent(event: CardCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);

    if (event.payload.group) {
      const group = await this.cardGroupService.findOneWithCards(event.payload.group);
      if (group) {
        group.cards = [...(group.cards ?? []), event.card];
        await this.cardGroupService.save(group);
      }
    }
  }
}
