import { USER_STUB } from '@bunch/users/common';

import { CardCreate, CardDto } from './card.interface';

export const CARD_STUB: CardDto = {
  uuid: 'random-uuid',
  groupUuid: 'group-uuid',
  cover: null,
  translation: 'Пример',
  original: 'Simple',
  createdAt: '2022-07-24T15:18:35.183Z',
  updatedAt: '2022-07-24T15:18:35.183Z',
  owner: USER_STUB.uuid,
};

export const CARDS_STUB: CardDto[] = [CARD_STUB];

export const CARD_CREATE_STUB: CardCreate = {
  translation: CARD_STUB.translation,
  original: CARD_STUB.original,
  uuid: CARD_STUB.uuid,
  groupUuid: CARD_STUB.groupUuid,
};

export const CARD_CHANGE_STUB: CardCreate = CARD_CREATE_STUB;
