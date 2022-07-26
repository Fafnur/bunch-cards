import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CardCreatedEvent, CardEvents } from '@bunch/api/card';

import { GroupService } from './group.service';

@Injectable()
export class GroupListener {
  constructor(private readonly groupService: GroupService) {}

  @OnEvent(CardEvents.Created)
  async handleCardCreatedEvent(event: CardCreatedEvent) {
    if (event.payload.groupUuid) {
      const group = await this.groupService.findOneWithCards(event.payload.groupUuid);
      if (group) {
        group.cards = [...(group.cards ?? []), event.card];
        await this.groupService.save(group);
      }
    }
  }
}
