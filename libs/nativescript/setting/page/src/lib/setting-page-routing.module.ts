import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { SettingPageComponent } from './setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingPageComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingPageRoutingModule {}
