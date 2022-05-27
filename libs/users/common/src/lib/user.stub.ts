import { User, UserAuth, UserStatus } from './user.interface';

export const USER_STUB: User = {
  id: 1,
  status: UserStatus.Verified,
  username: 'alex',
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
  username: USER_STUB.username,
};
