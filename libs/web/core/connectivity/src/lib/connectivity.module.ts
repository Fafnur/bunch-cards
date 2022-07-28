import { NgModule } from '@angular/core';

import { ConnectivityService } from '@bunch/core/connectivity';

import { WebConnectivityService } from './connectivity.service';

@NgModule({
  providers: [
    {
      provide: ConnectivityService,
      useClass: WebConnectivityService,
    },
  ],
})
export class ConnectivityModule {}
