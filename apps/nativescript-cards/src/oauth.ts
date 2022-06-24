import { configureTnsOAuth } from 'nativescript-oauth2';
import { TnsOaProviderGoogle, TnsOaProviderOptionsGoogle } from 'nativescript-oauth2/providers';

export function configureOAuthProviders() {
  configureTnsOAuth([
    new TnsOaProviderGoogle({
      openIdSupport: 'oid-full',
      clientId: '932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb.apps.googleusercontent.com',
      redirectUri: 'com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb:/auth',
      urlScheme: 'com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb',
      scopes: ['email', 'profile'],
    } as TnsOaProviderOptionsGoogle),
  ]);
}
