import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResetFormModule } from '@bunch/web/auth/reset/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { ResetPageComponent } from './reset-page.component';
import { ResetPageRoutingModule } from './reset-page-routing.module';

@NgModule({
  imports: [CommonModule, ResetPageRoutingModule, ResetFormModule, AuthTitleModule, AuthLinksModule, AuthSigninModule],
  declarations: [ResetPageComponent],
})
export class ResetPageModule {}
