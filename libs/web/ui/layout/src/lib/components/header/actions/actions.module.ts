import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionsComponent } from './actions.component';
import { SupportModule } from './components/support/support.module';

@NgModule({
  imports: [CommonModule, SupportModule],
  declarations: [ActionsComponent],
  exports: [ActionsComponent],
})
export class ActionsModule {}
