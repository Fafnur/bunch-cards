import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ENVIRONMENTS } from '@bunch/core/environments';
import { NAVIGATION_PATHS, PATHS } from '@bunch/core/navigation';
import { RootStoreModule } from '@bunch/core/store/root';
import { HammerModule } from '@bunch/web/core/hammer';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    HammerModule,
    RootStoreModule,
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