import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTnsOAuth } from 'nativescript-oauth2';
import { TnsOaProviderGoogle, TnsOaProviderOptionsGoogle } from 'nativescript-oauth2/providers';

import { ConfigService } from '@bunch/nativescript/core/config';

export function authProvidersFactory(configService: ConfigService): () => void {
  return () =>
    configureTnsOAuth([
      new TnsOaProviderGoogle({
        openIdSupport: 'oid-full',
        clientId: configService.config.googleClientId,
        redirectUri: configService.config.googleCallback,
        urlScheme: configService.config.googleUrlScheme,
        scopes: ['email', 'profile'],
      } as TnsOaProviderOptionsGoogle),
    ]);
}

/**
 * Note: Init on AppCoreModule
 */
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authProvidersFactory,
      multi: true,
      deps: [ConfigService],
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthProvidersModule {}
