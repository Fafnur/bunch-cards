import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WidthModule } from '@bunch/web/ui/theming';

import { LoginUsernameComponent } from './login-username.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, WidthModule],
  declarations: [LoginUsernameComponent],
  exports: [LoginUsernameComponent],
})
export class LoginUsernameModule {}
