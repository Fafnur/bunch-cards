import { NgModule } from '@angular/core';

import { LocalDBService } from '@bunch/core/localdb';

import { NativescriptLocalDBService } from './localdb.service';

@NgModule({
  providers: [
    {
      provide: LocalDBService,
      useClass: NativescriptLocalDBService,
    },
  ],
})
export class LocaldbModule {}
