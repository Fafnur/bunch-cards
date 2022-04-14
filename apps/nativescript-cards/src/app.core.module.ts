import { NgModule } from '@angular/core';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ENVIRONMENTS } from '@bunch/core/environments';
import { RootStoreModule } from '@bunch/core/store/root';
import { LayoutModule } from '@bunch/nativescript/ui/layout';

import { environment } from './environments/environment';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    RootStoreModule,
    LayoutModule,
    !environment.production ? StoreDevtoolsModule.instrument({ logOnly: environment.production }) : [],
  ],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
  ],
})
export class AppCoreModule {}
