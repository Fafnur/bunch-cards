import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LearningPageComponent } from './learning-page.component';
import { LearningPageRoutingModule } from './learning-page-routing.module';

@NgModule({
  imports: [CommonModule, LearningPageRoutingModule],
  declarations: [LearningPageComponent],
  exports: [LearningPageComponent],
})
export class LearningPageModule {}
