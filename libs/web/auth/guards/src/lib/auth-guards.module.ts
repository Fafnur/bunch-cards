import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { LoggedGuard } from './logged.guard';

@NgModule({
  providers: [AuthGuard, LoggedGuard],
})
export class AuthGuardsModule {}
