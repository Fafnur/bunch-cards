import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { LogoComponent } from './logo.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavigationPipesModule, MatIconModule],
  declarations: [LogoComponent],
  exports: [LogoComponent],
})
export class LogoModule {}
