import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagementPageComponent } from './management-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementPageRoutingModule {}
