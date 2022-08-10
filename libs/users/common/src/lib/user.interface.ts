export enum UserStatus {
  Created = 'created',
  Verified = 'verified',
  Rejected = 'rejected',
  Removed = 'removed',
}

export interface User {
  readonly id: number;
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly photo: string | null;
  readonly firstname: string;
  readonly lastname: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly status: UserStatus;
}

export interface UserChange {
  readonly uuid: string;
  readonly username?: string;
  readonly email?: string;
  readonly photo?: string | null;
  readonly firstname?: string;
  readonly lastname?: string;
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
  readonly accessToken: string;
  readonly uuid: string;
}

export interface UserCredentials {
  /**
   * email
   */
  readonly username: string;
  readonly password: string;
}

export interface UserCreate {
  readonly email: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly uuid: string;
}

export interface UserSecrets {
  readonly email: string;
}

export interface UserPasswordChange {
  readonly password: string;
  readonly token: string;
}

export interface UserJwtCredentials {
  readonly uuid: string;
}

export enum UserStorageKeys {
  AuthToken = 'authToken',
  Id = 'userId',
  Username = 'username',
}
