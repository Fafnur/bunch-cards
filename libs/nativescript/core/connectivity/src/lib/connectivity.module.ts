import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { ConnectivityService } from '@bunch/core/connectivity';

import { NativescriptConnectivityService } from './connectivity.service';

@NgModule({
  providers: [
    {
      provide: ConnectivityService,
      useClass: NativescriptConnectivityService,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConnectivityModule {}
