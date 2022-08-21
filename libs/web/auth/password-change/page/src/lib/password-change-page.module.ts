import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PasswordChangeFormModule } from '@bunch/web/auth/password-change/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { PasswordChangePageComponent } from './password-change-page.component';
import { PasswordChangePageRoutingModule } from './password-change-page-routing.module';

@NgModule({
  imports: [CommonModule, PasswordChangePageRoutingModule, PasswordChangeFormModule, AuthTitleModule, AuthLinksModule, AuthSigninModule],
  declarations: [PasswordChangePageComponent],
})
export class PasswordChangePageModule {}
