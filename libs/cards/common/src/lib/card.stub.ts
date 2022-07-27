import { CardCreate, CardDto } from './card.interface';

export const CARD_STUB: CardDto = {
  id: 1,
  uuid: 'random-uuid',
  cover: null,
  translation: 'Пример',
  original: 'Simple',
  createdAt: '2022-07-24T15:18:35.183Z',
  updatedAt: '2022-07-24T15:18:35.183Z',
  owner: 1,
};

export const CARDS_STUB: CardDto[] = [CARD_STUB];

export const CARD_CREATE_STUB: CardCreate = {
  translation: 'Пример',
  original: 'Simple',
  uuid: 'card-uuid',
};

export const CARD_CHANGE_STUB: CardCreate = CARD_CREATE_STUB;
