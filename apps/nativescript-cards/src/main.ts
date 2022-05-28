import { enableProdMode } from '@angular/core';
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { configureTnsOAuth } from 'nativescript-oauth2';
import { TnsOaProviderGoogle, TnsOaProviderOptionsGoogle } from 'nativescript-oauth2/providers';

import { AppModule } from './app.module';
import { environment } from './environments/environment';

configureTnsOAuth([
  new TnsOaProviderGoogle({
    openIdSupport: 'oid-full',
    clientId: '932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb.apps.googleusercontent.com',
    redirectUri: 'com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb:/auth',
    urlScheme: 'com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb',
    scopes: ['email', 'profile'],
  } as TnsOaProviderOptionsGoogle),
]);

if (environment.production) {
  enableProdMode();
}

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
