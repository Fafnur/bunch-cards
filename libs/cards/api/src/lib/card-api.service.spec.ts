import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { CARD_CHANGE_STUB, CARD_CREATE_STUB, CARD_STUB, CARDS_STUB } from '@bunch/cards/common';
import { ApiService } from '@bunch/core/api';

import { CARD_API_ROUTES, CardApiService } from './card-api.service';

describe('CardApiService', () => {
  let service: CardApiService;
  let apiServiceMock: ApiService;

  beforeAll(() => {
    apiServiceMock = mock(ApiService);
    service = new CardApiService(instance(apiServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call load()', () => {
    const result = hot('a', { a: CARDS_STUB });
    when(apiServiceMock.get(CARD_API_ROUTES.load)).thenReturn(result);

    expect(service.load()).toBeObservable(result);
  });

  it('should call loadOne()', () => {
    const result = hot('a', { a: CARD_STUB });
    when(apiServiceMock.get(CARD_API_ROUTES.loadOne(CARD_STUB.uuid))).thenReturn(result);

    expect(service.loadOne(CARD_STUB.uuid)).toBeObservable(result);
  });

  it('should call create()', () => {
    const result = hot('a', { a: CARD_STUB });
    when(apiServiceMock.post(CARD_API_ROUTES.create, deepEqual(CARD_CREATE_STUB))).thenReturn(result);

    expect(service.create(CARD_CREATE_STUB)).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('a', { a: CARD_STUB });
    when(apiServiceMock.patch(CARD_API_ROUTES.change(CARD_STUB.uuid), deepEqual(CARD_CHANGE_STUB))).thenReturn(result);

    expect(service.change(CARD_STUB.uuid, CARD_CHANGE_STUB)).toBeObservable(result);
  });

  it('should call remove()', () => {
    const result = hot('a', { a: null });
    when(apiServiceMock.delete(CARD_API_ROUTES.change(CARD_STUB.uuid))).thenReturn(result);

    expect(service.remove(CARD_STUB.uuid)).toBeObservable(result);
  });

  it('should call sync()', () => {
    const result = hot('a', { a: CARDS_STUB });
    when(apiServiceMock.put(CARD_API_ROUTES.sync, deepEqual(CARDS_STUB))).thenReturn(result);

    expect(service.sync(CARDS_STUB)).toBeObservable(result);
  });
});
