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
