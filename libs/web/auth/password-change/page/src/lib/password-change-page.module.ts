import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResetFormModule } from '@bunch/web/auth/reset/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { PasswordChangePageComponent } from './password-change-page.component';
import { PasswordChangePageRoutingModule } from './password-change-page-routing.module';

@NgModule({
  imports: [CommonModule, PasswordChangePageRoutingModule, ResetFormModule, AuthTitleModule, AuthLinksModule, AuthSigninModule],
  declarations: [PasswordChangePageComponent],
})
export class PasswordChangePageModule {}
