export enum UserStatus {
  Created = 'created',
  Verified = 'verified',
  Rejected = 'rejected',
  Removed = 'removed',
}

export interface User {
  id: number;
  username: string;
  email: string;
  photo: string | null;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
}

export enum UserField {
  Username = 'username',
  Password = 'password',
  LastName = 'lastName',
  FirstName = 'firstName',
  Email = 'email',
  Photo = 'photo',
}

export interface UserAuth {
  accessToken: string;
  id: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserSecrets {
  email: string;
}

export interface UserPasswordChange {
  password: string;
  token: string;
}

export interface UserJwtCredentials {
  userId: number;
  username: string;
}

export enum UserStorageKeys {
  AuthToken = 'authToken',
  Id = 'userId',
  Username = 'username',
}
