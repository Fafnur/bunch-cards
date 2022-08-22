import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthApiModule } from '@bunch/auth/api';
import { AuthManagerModule } from '@bunch/auth/manager';

import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { AUTH_FEATURE_KEY, authReducer } from './auth.reducer';

@NgModule({
  imports: [
    AuthApiModule,
    AuthManagerModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade],
})
export class AuthStateModule {}
