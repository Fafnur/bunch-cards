import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { LearningPageComponent } from './learning-page.component';
import { LearningPageRoutingModule } from './learning-page-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, LearningPageRoutingModule],
  declarations: [LearningPageComponent],
  exports: [LearningPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LearningPageModule {}
