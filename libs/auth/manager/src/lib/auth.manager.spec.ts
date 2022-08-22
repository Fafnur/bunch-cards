import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { AUTH_RESPONSE_STUB } from '@bunch/auth/common';
import { LocalDBService, LocalDBServiceStub } from '@bunch/core/localdb';

import { AuthManager } from './auth.manager';

describe('AuthManager', () => {
  let service: AuthManager;
  let localDBServiceMock: LocalDBService;

  beforeAll(() => {
    localDBServiceMock = mock(LocalDBServiceStub);
    service = new AuthManager(instance(localDBServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call get()', () => {
    const result = hot('a', { a: AUTH_RESPONSE_STUB });
    when(localDBServiceMock.getAll(AuthManager.storeName)).thenReturn(hot('a', { a: [AUTH_RESPONSE_STUB] }));

    expect(service.get()).toBeObservable(result);
  });

  it('should call put()', () => {
    const result = hot('-a', { a: AUTH_RESPONSE_STUB });
    when(localDBServiceMock.put(AuthManager.storeName, deepEqual(AUTH_RESPONSE_STUB))).thenReturn(result);

    expect(service.put(AUTH_RESPONSE_STUB)).toBeObservable(result);
  });

  it('should call clear()', () => {
    const result = hot('a', { a: null });
    when(localDBServiceMock.clear(AuthManager.storeName)).thenReturn(result);

    expect(service.remove()).toBeObservable(result);
  });
});
