import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ENVIRONMENTS } from '@bunch/core/environments';

import { environment } from '../environments/environment';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
  ],
})
export class AppCoreModule {}
