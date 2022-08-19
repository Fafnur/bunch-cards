import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OauthPageComponent } from './oauth-page.component';

const routes: Routes = [
  {
    path: '',
    component: OauthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OauthPageRoutingModule {}
