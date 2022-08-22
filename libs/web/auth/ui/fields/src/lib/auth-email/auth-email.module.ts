import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { WidthModule } from '@bunch/web/ui/theming';

import { AuthEmailComponent } from './auth-email.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, WidthModule, FormExtractsModule],
  declarations: [AuthEmailComponent],
  exports: [AuthEmailComponent],
})
export class AuthEmailModule {}
