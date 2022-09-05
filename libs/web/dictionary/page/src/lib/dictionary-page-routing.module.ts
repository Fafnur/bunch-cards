import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';
import { DictionaryLayoutComponent, DictionaryLayoutModule } from '@bunch/web/dictionary/ui/layout';
import { GroupEditGuard, GroupsGuardsModule } from '@bunch/web/groups/guards';

const routes: Routes = [
  {
    path: NAVIGATION_PATHS.dictionary,
    redirectTo: NAVIGATION_PATHS.groupsManagement,
    pathMatch: 'full',
  },
  {
    path: '',
    component: DictionaryLayoutComponent,
    children: [
      {
        path: NAVIGATION_PATHS.groupsManagement,
        loadChildren: () => import('@bunch/web/groups/management/page').then((modules) => modules.ManagementPageModule),
      },
      {
        path: NAVIGATION_PATHS.groupsCreate,
        loadChildren: () => import('@bunch/web/groups/create/page').then((modules) => modules.CreatePageModule),
      },
      {
        path: NAVIGATION_PATHS.groupsEdit,
        canActivate: [GroupEditGuard],
        loadChildren: () => import('@bunch/web/groups/edit/page').then((modules) => modules.EditPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DictionaryLayoutModule, GroupsGuardsModule],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
