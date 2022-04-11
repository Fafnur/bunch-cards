import { NgModule } from '@angular/core';
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
} from '@nativescript/angular';

import { ENVIRONMENTS } from '@bunch/core/environments';

import { environment } from './environments/environment';

@NgModule({
  imports: [NativeScriptModule, NativeScriptHttpClientModule],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
  ],
})
export class AppCoreModule {}
