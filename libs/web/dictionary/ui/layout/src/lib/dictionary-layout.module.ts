import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DictionaryLayoutComponent } from './dictionary-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DictionaryLayoutComponent],
  exports: [DictionaryLayoutComponent],
})
export class DictionaryLayoutModule {}
