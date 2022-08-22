import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { AuthResetComponent } from './auth-reset.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, NavigationPipesModule],
  declarations: [AuthResetComponent],
  exports: [AuthResetComponent],
})
export class AuthResetModule {}
