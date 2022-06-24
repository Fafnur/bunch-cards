import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { AuthPageComponent } from './auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class AuthPageRoutingModule {}
