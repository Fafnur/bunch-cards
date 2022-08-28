import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { CARD_CHANGE_STUB, CARD_CREATE_STUB, CARD_STUB, CARDS_STUB } from '@bunch/cards/common';
import { LocalDBService, LocalDBServiceStub } from '@bunch/core/localdb';
import { USER_STUB } from '@bunch/users/common';

import { CardManager } from './card.manager';

describe('CardManager', () => {
  let service: CardManager;
  let localDBServiceMock: LocalDBService;

  beforeAll(() => {
    localDBServiceMock = mock(LocalDBServiceStub);
    service = new CardManager(instance(localDBServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call load()', () => {
    const result = hot('a', { a: CARDS_STUB });
    when(localDBServiceMock.getAll(CardManager.storeName)).thenReturn(result);

    expect(service.load()).toBeObservable(result);
  });

  it('should call loadOne()', () => {
    const result = hot('a', { a: CARD_STUB });
    when(localDBServiceMock.get(CardManager.storeName, CARD_STUB.uuid)).thenReturn(result);

    expect(service.loadOne(CARD_STUB.uuid)).toBeObservable(result);
  });

  it('should call create()', () => {
    const mockDate = new Date(CARD_STUB.createdAt);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn<any, any>(global, 'Date').mockImplementation(() => mockDate);

    const result = hot('a', { a: { ...CARD_STUB, owner: USER_STUB.uuid } });
    when(localDBServiceMock.put(CardManager.storeName, deepEqual({ ...CARD_STUB, owner: USER_STUB.uuid }))).thenReturn(result);

    expect(service.create(CARD_CREATE_STUB, USER_STUB)).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('-a', { a: CARD_STUB });
    when(localDBServiceMock.get(CardManager.storeName, CARD_STUB.uuid)).thenReturn(hot('a', { a: CARD_STUB }));
    when(localDBServiceMock.put(CardManager.storeName, deepEqual(CARD_STUB))).thenReturn(result);

    expect(service.change(CARD_STUB.uuid, CARD_CHANGE_STUB)).toBeObservable(result);
  });

  it('should call remove()', () => {
    const result = hot('a', { a: null });
    when(localDBServiceMock.remove(CardManager.storeName, CARD_STUB.uuid)).thenReturn(result);

    expect(service.remove(CARD_STUB.uuid)).toBeObservable(result);
  });

  it('should call sync()', () => {
    const result = hot('a', { a: CARDS_STUB });
    when(localDBServiceMock.putAll(CardManager.storeName, deepEqual(CARDS_STUB))).thenReturn(result);
    when(localDBServiceMock.getAll(CardManager.storeName)).thenReturn(hot('a', { a: CARDS_STUB }));

    expect(service.sync(CARDS_STUB)).toBeObservable(result);
  });
});
