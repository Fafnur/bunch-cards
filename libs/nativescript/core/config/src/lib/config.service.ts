import { Injectable } from '@angular/core';
import { isAndroid, isIOS } from '@nativescript/core';

export interface Config {
  googleClientId: string;
  googleUrlScheme: string;
  googleCallback: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly config: Config;

  constructor() {
    let googleKey = isAndroid ? process.env['GOOGLE_KEY_ANDROID'] : isIOS ? process.env['GOOGLE_KEY_APPLE'] : '';

    if (!googleKey) {
      console.warn('Google OAUTH key is not found.');
      googleKey = '';
    }
    this.config = {
      googleClientId: `${googleKey}.apps.googleusercontent.com`,
      googleUrlScheme: `com.googleusercontent.apps.${googleKey}`,
      googleCallback: `com.googleusercontent.apps.${googleKey}:/auth`,
    };
  }

  getConfig(): Config {
    return this.config;
  }
}
