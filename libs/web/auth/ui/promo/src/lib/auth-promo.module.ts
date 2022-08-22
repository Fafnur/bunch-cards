import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPromoComponent } from './auth-promo.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthPromoComponent],
  exports: [AuthPromoComponent],
})
export class AuthPromoModule {}
