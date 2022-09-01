import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';

import { DictionaryPageComponent } from './dictionary-page.component';

const routes: Routes = [
  {
    path: NAVIGATION_PATHS.dictionary,
    redirectTo: NAVIGATION_PATHS.groupsManagement,
    pathMatch: 'full',
  },
  {
    path: '',
    component: DictionaryPageComponent,
    children: [
      {
        path: NAVIGATION_PATHS.groupsManagement,
        loadChildren: () => import('@bunch/web/groups/management/page').then((modules) => modules.ManagementPageModule),
      },
      {
        path: NAVIGATION_PATHS.groupsCreate,
        loadChildren: () => import('@bunch/web/groups/create/page').then((modules) => modules.CreatePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
