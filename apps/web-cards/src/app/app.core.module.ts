import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthStateModule } from '@bunch/auth/state';
import { ENVIRONMENTS } from '@bunch/core/environments';
import { InterceptorsModule } from '@bunch/core/interceptors';
import { NAVIGATION_PATHS, PATHS } from '@bunch/core/navigation';
import { RootStoreModule } from '@bunch/core/store/root';
import { UserStateModule } from '@bunch/users/state';
import { ConnectivityModule } from '@bunch/web/core/connectivity';
import { HammerModule } from '@bunch/web/core/hammer';
import { LocaldbModule } from '@bunch/web/core/localdb';
import { NavigationModule } from '@bunch/web/core/navigation';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    InterceptorsModule,
    HammerModule,
    ConnectivityModule,
    RootStoreModule,
    UserStateModule,
    AuthStateModule,
    LocaldbModule,
    NavigationModule,
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
