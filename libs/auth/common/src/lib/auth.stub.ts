import { AuthCredentials, AuthJwtCredentials, AuthPasswordChange, AuthRegister, AuthResponse, AuthSecrets } from './auth.interface';

export const AUTH_RESPONSE_STUB: AuthResponse = {
  accessToken: 'accessTokenRand1',
  uuid: 'alex',
};

export const AUTH_CREDENTIALS_STUB: AuthCredentials = {
  username: 'alex',
  password: '123456',
};

export const AUTH_SECRETS_STUB: AuthSecrets = {
  email: 'alex@alex.ru',
};

export const AUTH_PASSWORD_CHANGE_STUB: AuthPasswordChange = {
  password: '123456',
  token: '123456token',
};

export const AUTH_JWT_CREDENTIALS_STUB: AuthJwtCredentials = {
  uuid: AUTH_RESPONSE_STUB.uuid,
};

export const AUTH_REGISTER_STUB: AuthRegister = {
  uuid: AUTH_RESPONSE_STUB.uuid,
  email: 'alex@alex.ru',
  firstname: 'Ivan',
  lastname: 'Doorin',
  password: 'strong',
};
