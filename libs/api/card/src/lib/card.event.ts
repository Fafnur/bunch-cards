import { Card, CardCreate } from '@bunch/cards/common';

export enum CardEvents {
  Created = 'card.created',
}

export class CardCreatedEvent {
  card!: Card;
  payload!: CardCreate;
}
