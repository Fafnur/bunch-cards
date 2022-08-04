import { User, UserAuth, UserChange, UserStatus } from './user.interface';

export const USER_STUB: User = {
  id: 1,
  status: UserStatus.Verified,
  username: 'alex',
  uuid: 'alex',
  email: 'alex@alex.ru',
  photo: 'ig.jpg',
  firstname: 'Ivan',
  lastname: 'Doorin',
  createdAt: '2021-09-02T23:58:19.100Z',
  updatedAt: '2021-09-02T23:58:19.100Z',
};

export const USER_AUTH_STUB: UserAuth = {
  accessToken: 'accessTokenRand1',
  id: USER_STUB.id,
};

export const USER_CHANGE_STUB: UserChange = {
  uuid: 'alex',
  username: 'alex',
  email: 'alex@alex.ru',
  photo: 'ig.jpg',
  firstname: 'Ivan',
  lastname: 'Doorin',
};
