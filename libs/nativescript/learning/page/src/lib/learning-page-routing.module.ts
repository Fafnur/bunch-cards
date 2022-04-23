import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { LearningPageComponent } from './learning-page.component';

const routes: Routes = [
  {
    path: '',
    component: LearningPageComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class LearningPageRoutingModule {}
