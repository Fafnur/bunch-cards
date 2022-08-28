import { Action } from '@ngrx/store';

import { Card, CARD_STUB, CARDS_STUB } from '@bunch/cards/common';

import * as CardActions from './card.actions';
import { cardAdapter, cardReducer, CardState, initialCardState } from './card.reducer';

describe('Card Reducer', () => {
  const getState = (data?: Partial<CardState>, cards: Card[] = []) => cardAdapter.setAll(cards, { ...initialCardState, ...data });
  let state: CardState;

  beforeEach(() => {
    state = getState();
  });

  it('restore() should set cards', () => {
    const action = CardActions.restore({ cards: CARDS_STUB });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(CARDS_STUB.length);
  });

  it('loadSuccess() should set cards', () => {
    const action = CardActions.loadSuccess({ cards: CARDS_STUB });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(CARDS_STUB.length);
  });

  it('sync() should set cards', () => {
    const action = CardActions.syncSuccess({ cards: CARDS_STUB });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(CARDS_STUB.length);
  });

  it('loadFailure() should set loaded', () => {
    const action = CardActions.loadFailure({ error: '' });
    const result = cardReducer(state, action);

    expect(result.loaded).toBeTruthy();
  });

  it('loadOneSuccess() should add card', () => {
    const action = CardActions.loadOneSuccess({ card: CARD_STUB, uuid: CARD_STUB.uuid });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(1);
  });

  it('createSuccess() should add card', () => {
    const action = CardActions.createSuccess({ card: CARD_STUB });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(1);
  });

  it('changeSuccess() should change card', () => {
    const original = 'name';
    state = getState({}, [CARD_STUB]);
    const action = CardActions.changeSuccess({ card: { ...CARD_STUB, original } });
    const result = cardReducer(state, action);

    expect(result.entities[CARD_STUB.uuid]?.original).toBe(original);
  });

  it('removeSuccess() should change card', () => {
    state = getState({}, [CARD_STUB]);
    const action = CardActions.removeSuccess({ uuid: CARD_STUB.uuid });
    const result = cardReducer(state, action);

    expect(result.ids.length).toBe(0);
  });

  it('inti() should return the previous state', () => {
    const action = {} as Action;

    const result = cardReducer(initialCardState, action);

    expect(result).toBe(initialCardState);
  });
});
