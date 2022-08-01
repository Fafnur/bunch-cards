import { NgModule } from '@angular/core';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ENVIRONMENTS } from '@bunch/core/environments';
import { NAVIGATION_PATHS, PATHS } from '@bunch/core/navigation';
import { RootStoreModule } from '@bunch/core/store/root';
import { AuthProvidersModule } from '@bunch/nativescript/auth/providers';
import { ConnectivityModule } from '@bunch/nativescript/core/connectivity';
import { LocaldbModule } from '@bunch/nativescript/core/localdb';
import { LayoutModule } from '@bunch/nativescript/ui/layout';

import { environment } from './environments/environment';

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    ConnectivityModule,
    RootStoreModule,
    LayoutModule,
    AuthProvidersModule,
    LocaldbModule,
    !environment.production ? StoreDevtoolsModule.instrument({ logOnly: environment.production }) : [],
  ],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
    {
      provide: PATHS,
      useValue: NAVIGATION_PATHS,
    },
  ],
})
export class AppCoreModule {}
