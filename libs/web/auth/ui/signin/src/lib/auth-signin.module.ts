import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { AuthSigninComponent } from './auth-signin.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, NavigationPipesModule],
  declarations: [AuthSigninComponent],
  exports: [AuthSigninComponent],
})
export class AuthSigninModule {}
