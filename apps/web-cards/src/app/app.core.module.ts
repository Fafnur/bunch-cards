import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ENVIRONMENTS } from '@bunch/core/environments';
import { HammerModule } from '@bunch/web/core/hammer';

import { environment } from '../environments/environment';

@NgModule({
  imports: [HttpClientModule, HammerModule],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
  ],
})
export class AppCoreModule {}
