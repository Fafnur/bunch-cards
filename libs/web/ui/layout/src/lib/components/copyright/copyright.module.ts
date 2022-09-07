import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CopyrightComponent } from './copyright.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CopyrightComponent],
  exports: [CopyrightComponent],
})
export class CopyrightModule {}
