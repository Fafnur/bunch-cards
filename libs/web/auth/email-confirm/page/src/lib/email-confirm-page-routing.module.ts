import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailConfirmPageComponent } from './email-confirm-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmailConfirmPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailConfirmPageRoutingModule {}
