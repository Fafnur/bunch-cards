import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { deepEqual, mock, when } from 'ts-mockito';

import { CARD_CHANGE_STUB, CARD_CREATE_STUB, CARD_STUB, CARDS_STUB } from '@bunch/cards/common';
import { CardManager } from '@bunch/cards/manager';
import { API_ERROR_STUB } from '@bunch/core/api';
import { providerOf } from '@bunch/core/testing';
import { USER_STUB } from '@bunch/users/common';
import { selectUser } from '@bunch/users/state';

import * as CardActions from './card.actions';
import { CardEffects } from './card.effects';
import { CARD_FEATURE_KEY, initialCardState } from './card.reducer';

describe('CardEffects', () => {
  let actions: Observable<Action>;
  let effects: CardEffects;
  let cardManagerMock: CardManager;

  beforeEach(() => {
    cardManagerMock = mock(CardManager);

    TestBed.configureTestingModule({
      providers: [
        CardEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            [CARD_FEATURE_KEY]: initialCardState,
          },
          selectors: [{ selector: selectUser, value: USER_STUB }],
        }),
        providerOf(CardManager, cardManagerMock),
      ],
    });

    effects = TestBed.inject(CardEffects);
  });

  it('init$ should return restore()', () => {
    actions = hot('a', { a: CardActions.init() });
    const expected = hot('a', { a: CardActions.restore({ cards: CARDS_STUB }) });
    when(cardManagerMock.load()).thenReturn(hot('a', { a: CARDS_STUB }));

    expect(effects.init$).toBeObservable(expected);
  });

  it('load$ should return loadSuccess()', () => {
    actions = hot('a', { a: CardActions.load() });
    const expected = hot('a', { a: CardActions.loadSuccess({ cards: CARDS_STUB }) });
    when(cardManagerMock.load()).thenReturn(hot('a', { a: CARDS_STUB }));

    expect(effects.load$).toBeObservable(expected);
  });

  it('load$ should return loadFailure()', () => {
    actions = hot('a', { a: CardActions.load() });
    const expected = hot('a', { a: CardActions.loadFailure({ error: API_ERROR_STUB }) });
    when(cardManagerMock.load()).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.load$).toBeObservable(expected);
  });

  it('loadOne$ should return loadOneSuccess()', () => {
    actions = hot('a', { a: CardActions.loadOne({ uuid: CARD_STUB.uuid }) });
    const expected = hot('a', { a: CardActions.loadOneSuccess({ uuid: CARD_STUB.uuid, card: CARD_STUB }) });
    when(cardManagerMock.loadOne(CARD_STUB.uuid)).thenReturn(hot('a', { a: CARD_STUB }));

    expect(effects.loadOne$).toBeObservable(expected);
  });

  it('loadOne$ should return loadOneFailure()', () => {
    actions = hot('a', { a: CardActions.loadOne({ uuid: CARD_STUB.uuid }) });
    const expected = hot('a', { a: CardActions.loadOneFailure({ uuid: CARD_STUB.uuid, error: API_ERROR_STUB }) });
    when(cardManagerMock.loadOne(CARD_STUB.uuid)).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.loadOne$).toBeObservable(expected);
  });

  it('create$ should return createSuccess()', () => {
    actions = hot('a', { a: CardActions.create({ cardCreate: CARD_CREATE_STUB }) });
    const expected = hot('a', { a: CardActions.createSuccess({ card: CARD_STUB }) });
    when(cardManagerMock.create(deepEqual(CARD_CREATE_STUB), deepEqual(USER_STUB))).thenReturn(hot('a', { a: CARD_STUB }));

    expect(effects.create$).toBeObservable(expected);
  });

  it('create$ should return createFailure()', () => {
    actions = hot('a', { a: CardActions.create({ cardCreate: CARD_CREATE_STUB }) });
    const expected = hot('a', { a: CardActions.createFailure({ cardCreate: CARD_CREATE_STUB, error: API_ERROR_STUB }) });
    when(cardManagerMock.create(deepEqual(CARD_CREATE_STUB), deepEqual(USER_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.create$).toBeObservable(expected);
  });

  it('change$ should return changeSuccess()', () => {
    actions = hot('a', { a: CardActions.change({ uuid: CARD_CHANGE_STUB.uuid, cardChange: CARD_CHANGE_STUB }) });
    const expected = hot('a', { a: CardActions.changeSuccess({ card: CARD_STUB }) });
    when(cardManagerMock.change(CARD_CHANGE_STUB.uuid, deepEqual(CARD_CHANGE_STUB))).thenReturn(hot('a', { a: CARD_STUB }));

    expect(effects.change$).toBeObservable(expected);
  });

  it('change$ should return changeFailure()', () => {
    actions = hot('a', { a: CardActions.change({ uuid: CARD_CHANGE_STUB.uuid, cardChange: CARD_CHANGE_STUB }) });
    const expected = hot('a', { a: CardActions.changeFailure({ uuid: CARD_CHANGE_STUB.uuid, error: API_ERROR_STUB }) });
    when(cardManagerMock.change(CARD_CHANGE_STUB.uuid, deepEqual(CARD_CHANGE_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.change$).toBeObservable(expected);
  });

  it('remove$ should return removeSuccess()', () => {
    actions = hot('a', { a: CardActions.remove({ card: CARD_STUB }) });
    const expected = hot('a', { a: CardActions.removeSuccess({ card: CARD_STUB }) });
    when(cardManagerMock.remove(CARD_STUB.uuid)).thenReturn(hot('a', { a: undefined }));

    expect(effects.remove$).toBeObservable(expected);
  });

  it('remove$ should return removeFailure()', () => {
    actions = hot('a', { a: CardActions.remove({ card: CARD_STUB }) });
    const expected = hot('a', { a: CardActions.removeFailure({ card: CARD_STUB, error: API_ERROR_STUB }) });
    when(cardManagerMock.remove(CARD_STUB.uuid)).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.remove$).toBeObservable(expected);
  });

  it('sync$ should return syncSuccess ()', () => {
    actions = hot('a', { a: CardActions.sync({ cards: CARDS_STUB }) });
    const expected = hot('a', { a: CardActions.syncSuccess({ cards: CARDS_STUB }) });
    when(cardManagerMock.sync(deepEqual(CARDS_STUB))).thenReturn(hot('a', { a: CARDS_STUB }));

    expect(effects.sync$).toBeObservable(expected);
  });

  it('sync$ should return syncFailure()', () => {
    actions = hot('a', { a: CardActions.sync({ cards: CARDS_STUB }) });
    const expected = hot('a', { a: CardActions.syncFailure({ error: API_ERROR_STUB }) });
    when(cardManagerMock.sync(deepEqual(CARDS_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.sync$).toBeObservable(expected);
  });
});
