import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { LoginFormModule } from './components/login-form/login-form.module';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule({
  imports: [CommonModule, LoginPageRoutingModule, LoginFormModule, AuthTitleModule],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
