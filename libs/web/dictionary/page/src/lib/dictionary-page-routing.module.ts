import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';

import { DictionaryPageComponent } from './dictionary-page.component';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@bunch/web/groups/management/page').then((modules) => modules.ManagementPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
