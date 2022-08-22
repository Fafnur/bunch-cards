import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { AuthLinksComponent } from './auth-links.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, NavigationPipesModule, MatIconModule],
  declarations: [AuthLinksComponent],
  exports: [AuthLinksComponent],
})
export class AuthLinksModule {}
