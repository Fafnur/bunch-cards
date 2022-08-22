import { NgModule } from '@angular/core';

import { AuthLayoutModule } from '@bunch/web/auth/ui/layout';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';

@NgModule({
  imports: [AuthLayoutModule, AuthPagesRoutingModule],
})
export class AuthPagesModule {}
