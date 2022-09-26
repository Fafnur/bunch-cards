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
        path: NAVIGATION_PATHS.groupCreate,
        loadChildren: () => import('@bunch/web/groups/create/page').then((modules) => modules.CreatePageModule),
      },
      {
        path: NAVIGATION_PATHS.groupEdit,
        canActivate: [GroupEditGuard],
        loadChildren: () => import('@bunch/web/groups/edit/page').then((modules) => modules.EditPageModule),
      },
      {
        path: NAVIGATION_PATHS.groupCardCreate,
        canActivate: [GroupEditGuard],
        loadChildren: () => import('@bunch/web/cards/create/page').then((modules) => modules.CreatePageModule),
      },
      {
        path: NAVIGATION_PATHS.cardsManagement,
        loadChildren: () => import('@bunch/web/cards/management/page').then((modules) => modules.ManagementPageModule),
      },
      {
        path: NAVIGATION_PATHS.cardCreate,
        loadChildren: () => import('@bunch/web/cards/create/page').then((modules) => modules.CreatePageModule),
      },
      {
        path: NAVIGATION_PATHS.cardEdit,
        loadChildren: () => import('@bunch/web/cards/edit/page').then((modules) => modules.EditPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DictionaryLayoutModule, GroupsGuardsModule],
  exports: [RouterModule],
})
export class DictionaryPageRoutingModule {}
