import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { DictionaryPageComponent } from './dictionary-page.component';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPageComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class DictionaryPageRoutingModule {}
