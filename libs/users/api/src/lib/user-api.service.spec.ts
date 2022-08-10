import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { ApiService } from '@bunch/core/api';
import { USER_CHANGE_STUB, USER_STUB } from '@bunch/users/common';

import { USER_API_ROUTES, UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;
  let apiServiceMock: ApiService;

  beforeAll(() => {
    apiServiceMock = mock(ApiService);
    service = new UserApiService(instance(apiServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call load()', () => {
    const result = hot('a', { a: USER_STUB });
    when(apiServiceMock.get(USER_API_ROUTES.load)).thenReturn(result);

    expect(service.load()).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('a', { a: USER_STUB });
    when(apiServiceMock.patch(USER_API_ROUTES.change, deepEqual(USER_CHANGE_STUB))).thenReturn(result);

    expect(service.change(USER_CHANGE_STUB)).toBeObservable(result);
  });
});
