import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { CARD_CHANGE_STUB, CARD_CREATE_STUB, CARD_STUB, CARDS_STUB } from '@bunch/cards/common';
import { HTTP_ERROR_STUB } from '@bunch/core/api';

import * as CardActions from './card.actions';
import { CardFacade } from './card.facade';
import { CARD_FEATURE_KEY, initialCardState } from './card.reducer';
import * as CardSelectors from './card.selectors';

describe('CardFacade', () => {
  let actions: Observable<unknown>;
  let facade: CardFacade;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardFacade,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: { [CARD_FEATURE_KEY]: initialCardState },
          selectors: [
            { selector: CardSelectors.selectLoaded, value: true },
            { selector: CardSelectors.selectCards, value: CARDS_STUB },
          ],
        }),
      ],
    });

    facade = TestBed.inject(CardFacade);
    store = TestBed.inject(MockStore);

    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(facade).toBeTruthy();
  });

  it('should return loaded$', () => {
    const expected = hot('a', { a: true });

    expect(facade.loaded$).toBeObservable(expected);
  });

  it('should return cards$', () => {
    const expected = hot('a', { a: CARDS_STUB });

    expect(facade.cards$).toBeObservable(expected);
  });

  it('should emit loadSuccess$', () => {
    const action = CardActions.loadSuccess({ cards: CARDS_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: CARDS_STUB });

    expect(facade.loadSuccess$).toBeObservable(expected);
  });

  it('should emit loadFailure$', () => {
    const action = CardActions.loadFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loadFailure$).toBeObservable(expected);
  });

  it('should emit loadOneSuccess$', () => {
    const action = CardActions.loadOneSuccess({ uuid: CARD_STUB.uuid, card: CARD_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: CARD_STUB });

    expect(facade.loadOneSuccess$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit loadOneFailure$', () => {
    const action = CardActions.loadOneFailure({ uuid: CARD_STUB.uuid, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loadOneFailure$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit createSuccess$', () => {
    const action = CardActions.createSuccess({ card: CARD_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: CARD_STUB });

    expect(facade.createOneSuccess$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit createFailure$', () => {
    const action = CardActions.createFailure({ cardCreate: CARD_CREATE_STUB, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.createOneFailure$(CARD_CREATE_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit changeSuccess$', () => {
    const action = CardActions.changeSuccess({ card: CARD_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: CARD_STUB });

    expect(facade.changeSuccess$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit changeFailure$', () => {
    const action = CardActions.changeFailure({ uuid: CARD_STUB.uuid, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.changeFailure$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit removeSuccess$', () => {
    const action = CardActions.removeSuccess({ card: CARD_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: undefined });

    expect(facade.removeSuccess$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit removeFailure$', () => {
    const action = CardActions.removeFailure({ card: CARD_STUB, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.removeFailure$(CARD_STUB.uuid)).toBeObservable(expected);
  });

  it('load() should dispatch action', () => {
    facade.load();

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.load());
  });

  it('loadOne() should dispatch action', () => {
    facade.loadOne(CARD_STUB.uuid);

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.loadOne({ uuid: CARD_STUB.uuid }));
  });

  it('create() should dispatch action', () => {
    facade.create(CARD_CREATE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.create({ cardCreate: CARD_CREATE_STUB }));
  });

  it('change() should dispatch action', () => {
    facade.change(CARD_CHANGE_STUB.uuid, CARD_CHANGE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.change({ uuid: CARD_CHANGE_STUB.uuid, cardChange: CARD_CHANGE_STUB }));
  });

  it('remove() should dispatch action', () => {
    facade.remove(CARD_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.remove({ card: CARD_STUB }));
  });

  it('sync() should dispatch action', () => {
    facade.sync(CARDS_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(CardActions.sync({ cards: CARDS_STUB }));
  });
});
