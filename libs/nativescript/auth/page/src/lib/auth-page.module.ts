import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { AuthProvidersModule } from '@bunch/nativescript/auth/providers';

import { AuthPageComponent } from './auth-page.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, AuthPageRoutingModule],
  declarations: [AuthPageComponent],
  exports: [AuthPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AuthPageModule {}
