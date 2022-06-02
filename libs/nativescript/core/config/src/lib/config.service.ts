import { Injectable } from '@angular/core';

export interface Config {
  googleClientId: string;
  googleUrlScheme: string;
  googleCallback: string;
}

export const CONFIG_DEFAULT: Config = {
  googleClientId: '',
  googleUrlScheme: '',
  googleCallback: '',
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly config: Config;

  constructor() {
    this.config = {
      googleClientId: process.env['GOOGLE_CLIENT_ID'] ?? CONFIG_DEFAULT.googleClientId,
      googleUrlScheme: process.env['GOOGLE_URL_SCHEME'] ?? CONFIG_DEFAULT.googleUrlScheme,
      googleCallback: process.env['GOOGLE_CALLBACK_URL'] ?? CONFIG_DEFAULT.googleCallback,
    };
  }

  getConfig(): Config {
    return this.config;
  }
}
