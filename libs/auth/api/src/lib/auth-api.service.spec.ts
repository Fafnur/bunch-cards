import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import {
  AUTH_CREDENTIALS_STUB,
  AUTH_PASSWORD_CHANGE_STUB,
  AUTH_REGISTER_STUB,
  AUTH_RESPONSE_STUB,
  AUTH_SECRETS_STUB,
} from '@bunch/auth/common';
import { ApiService } from '@bunch/core/api';

import { AUTH_API_ROUTES, AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let apiServiceMock: ApiService;

  beforeAll(() => {
    apiServiceMock = mock(ApiService);
    service = new AuthApiService(instance(apiServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call login()', () => {
    const result = hot('a', { a: AUTH_RESPONSE_STUB });
    when(apiServiceMock.post(AUTH_API_ROUTES.login, deepEqual(AUTH_CREDENTIALS_STUB))).thenReturn(result);

    expect(service.login(AUTH_CREDENTIALS_STUB)).toBeObservable(result);
  });

  it('should call reset()', () => {
    const result = hot('a', { a: null });
    when(apiServiceMock.post(AUTH_API_ROUTES.reset, deepEqual(AUTH_SECRETS_STUB))).thenReturn(result);

    expect(service.reset(AUTH_SECRETS_STUB)).toBeObservable(result);
  });

  it('should call register()', () => {
    const result = hot('a', { a: AUTH_RESPONSE_STUB });
    when(apiServiceMock.post(AUTH_API_ROUTES.register, deepEqual(AUTH_REGISTER_STUB))).thenReturn(result);

    expect(service.register(AUTH_REGISTER_STUB)).toBeObservable(result);
  });

  it('should call changePassword()', () => {
    const result = hot('a', { a: AUTH_REGISTER_STUB });
    when(apiServiceMock.post(AUTH_API_ROUTES.changePassword, deepEqual(AUTH_PASSWORD_CHANGE_STUB))).thenReturn(result);

    expect(service.changePassword(AUTH_PASSWORD_CHANGE_STUB)).toBeObservable(result);
  });
});
