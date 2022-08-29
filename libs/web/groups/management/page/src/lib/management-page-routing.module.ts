import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagementPageModule } from './management-page.module';

const routes: Routes = [
  {
    path: '',
    component: ManagementPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementPageRoutingModule {}
