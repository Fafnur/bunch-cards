import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DictionaryPageComponent } from './dictionary-page.component';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
