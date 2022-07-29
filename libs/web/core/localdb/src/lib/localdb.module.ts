import { NgModule } from '@angular/core';

import { LocalDBService } from '@bunch/core/localdb';

import { WebLocalDBService } from './localdb.service';

@NgModule({
  providers: [
    WebLocalDBService,
    // {
    //   provide: LocalDBService,
    //   useClass: WebLocalDBService,
    // },
  ],
})
export class LocaldbModule {}
