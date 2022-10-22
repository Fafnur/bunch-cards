import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { GroupCardComponent } from './group-card.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, NavigationPipesModule],
  declarations: [GroupCardComponent],
  exports: [GroupCardComponent],
})
export class GroupCardModule {}
