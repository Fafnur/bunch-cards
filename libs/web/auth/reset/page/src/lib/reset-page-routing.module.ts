import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPageComponent } from './reset-page.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPageRoutingModule {}
