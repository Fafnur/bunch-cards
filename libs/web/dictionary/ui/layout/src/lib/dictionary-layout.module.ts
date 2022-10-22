import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DictionaryTabsModule } from '@bunch/web/dictionary/ui/tabs';

import { DictionaryLayoutComponent } from './dictionary-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, DictionaryTabsModule],
  declarations: [DictionaryLayoutComponent],
  exports: [DictionaryLayoutComponent],
})
export class DictionaryLayoutModule {}
