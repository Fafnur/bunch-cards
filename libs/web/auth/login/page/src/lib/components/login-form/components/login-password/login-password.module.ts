import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WidthModule } from '@bunch/web/ui/theming';

import { LoginPasswordComponent } from './login-password.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, WidthModule],
  declarations: [LoginPasswordComponent],
  exports: [LoginPasswordComponent],
})
export class LoginPasswordModule {}
