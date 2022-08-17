import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginFormModule } from '@bunch/web/auth/login/ui/form';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule({
  imports: [CommonModule, LoginPageRoutingModule, LoginFormModule, AuthTitleModule],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
