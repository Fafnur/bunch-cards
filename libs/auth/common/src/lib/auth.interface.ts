export enum AuthField {
  Username = 'username',
  Password = 'password',
  Email = 'email',
  Token = 'token',
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly uuid: string;
}

export interface AuthCredentials {
  /**
   * email
   */
  readonly username: string;
  readonly password: string;
}

export interface AuthSecrets {
  readonly email: string;
}

export interface AuthPasswordChange {
  readonly password: string;
  readonly token: string;
}

export interface AuthJwtCredentials {
  readonly uuid: string;
}

export interface AuthRegister {
  readonly email: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly uuid: string;
}
