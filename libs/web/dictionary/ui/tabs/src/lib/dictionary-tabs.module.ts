import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { DictionaryTabsComponent } from './dictionary-tabs.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatTabsModule, NavigationPipesModule],
  declarations: [DictionaryTabsComponent],
  exports: [DictionaryTabsComponent],
})
export class DictionaryTabsModule {}
