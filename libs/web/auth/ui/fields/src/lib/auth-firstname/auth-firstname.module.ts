import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { WidthModule } from '@bunch/web/ui/theming';

import { AuthFirstnameComponent } from './auth-firstname.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, WidthModule, FormExtractsModule],
  declarations: [AuthFirstnameComponent],
  exports: [AuthFirstnameComponent],
})
export class AuthFirstnameModule {}
