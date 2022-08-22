import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthPromoModule } from '@bunch/web/auth/ui/promo';
import { ContainerModule } from '@bunch/web/ui/container';
import { GridModule } from '@bunch/web/ui/grid';

import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, ContainerModule, GridModule, AuthPromoModule],
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
