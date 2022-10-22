import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { CardEntity } from '@bunch/cards/common';

import * as CardActions from './card.actions';

export const CARD_FEATURE_KEY = 'cards';

export interface CardState extends EntityState<CardEntity> {
  readonly loaded: boolean;
}

export interface CardPartialState {
  readonly [CARD_FEATURE_KEY]: CardState;
}

export const cardAdapter = createEntityAdapter<CardEntity>({
  selectId: (entity) => entity.uuid,
});

export const initialCardState: CardState = cardAdapter.getInitialState({
  loaded: false,
});

const reducer = createReducer(
  initialCardState,
  on(
    CardActions.restore,
    (state, { cards }): CardState =>
      cardAdapter.setAll(cards ?? [], {
        ...state,
        loaded: cards != null,
      })
  ),
  on(
    CardActions.load,
    (state): CardState => ({
      ...state,
      // loaded: false,
    })
  ),
  on(
    CardActions.loadSuccess,
    CardActions.syncSuccess,
    (state, { cards }): CardState =>
      cardAdapter.setAll(cards, {
        ...state,
        loaded: true,
      })
  ),
  on(
    CardActions.loadFailure,
    CardActions.syncFailure,
    (state): CardState => ({
      ...state,
      loaded: true,
    })
  ),
  on(CardActions.loadOneSuccess, (state, { card }): CardState => (card ? cardAdapter.upsertOne(card, state) : state)),
  on(CardActions.createSuccess, (state, { card }): CardState => cardAdapter.addOne(card, state)),
  on(
    CardActions.changeSuccess,
    (state, { card }): CardState =>
      cardAdapter.updateOne(
        {
          id: card.uuid,
          changes: card,
        },
        state
      )
  ),
  on(CardActions.removeSuccess, (state, { card }): CardState => cardAdapter.removeOne(card.uuid, state))
);

export function cardReducer(state: CardState | undefined, action: Action): CardState {
  return reducer(state, action);
}
