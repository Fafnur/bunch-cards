import { Card, CARDS_STUB } from '@bunch/cards/common';

import { cardAdapter, CardState, initialCardState } from './card.reducer';
import * as CardSelectors from './card.selectors';

describe('Card Selectors', () => {
  const getState = (data?: Partial<CardState>, cards: Card[] = []) => cardAdapter.setAll(cards, { ...initialCardState, ...data });
  let state: CardState;

  it('selectCards() should return cards', () => {
    state = getState({}, CARDS_STUB);
    const results = CardSelectors.selectCards.projector(state);

    expect(results.length).toBe(CARDS_STUB.length);
  });

  it('selectLoaded() should return loaded', () => {
    state = getState({ loaded: true });
    const result = CardSelectors.selectLoaded.projector(state);

    expect(result).toBeTruthy();
  });
});
