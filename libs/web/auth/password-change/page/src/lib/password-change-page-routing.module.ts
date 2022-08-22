import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PasswordChangePageComponent } from './password-change-page.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordChangePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordChangePageRoutingModule {}
