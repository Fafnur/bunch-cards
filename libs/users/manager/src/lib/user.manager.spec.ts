import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { LocalDBService, LocalDBServiceStub } from '@bunch/core/localdb';
import { USER_CHANGE_STUB, USER_STUB } from '@bunch/users/common';

import { UserManager } from './user.manager';

describe('UserManager', () => {
  let service: UserManager;
  let localDBServiceMock: LocalDBService;

  beforeAll(() => {
    localDBServiceMock = mock(LocalDBServiceStub);
    service = new UserManager(instance(localDBServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call loadOne()', () => {
    const result = hot('a', { a: USER_STUB });
    when(localDBServiceMock.get(UserManager.storeName, USER_STUB.uuid)).thenReturn(result);

    expect(service.loadOne(USER_STUB.uuid)).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('-a', { a: USER_STUB });
    when(localDBServiceMock.get(UserManager.storeName, USER_CHANGE_STUB.uuid)).thenReturn(hot('a', { a: USER_STUB }));
    when(localDBServiceMock.put(UserManager.storeName, deepEqual(USER_STUB))).thenReturn(result);

    expect(service.change(USER_CHANGE_STUB)).toBeObservable(result);
  });

  it('should call sync()', () => {
    const result = hot('a', { a: null });
    when(localDBServiceMock.put(UserManager.storeName, deepEqual(USER_STUB))).thenReturn(result);

    expect(service.sync(USER_STUB)).toBeObservable(result);
  });
});
