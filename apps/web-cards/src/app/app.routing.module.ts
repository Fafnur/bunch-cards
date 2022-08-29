import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';
import { AuthGuard, AuthGuardsModule, LoggedGuard } from '@bunch/web/auth/guards';
import { LayoutComponent, LayoutModule } from '@bunch/web/ui/layout';

const routes: Routes = [
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.dashboard,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LoggedGuard],
    children: [
      {
        path: NAVIGATION_PATHS.dashboard,
        loadChildren: () => import('@bunch/web/dashboard/page').then((modules) => modules.DashboardPageModule),
      },
      {
        path: NAVIGATION_PATHS.dictionary,
        loadChildren: () => import('@bunch/web/dictionary/page').then((modules) => modules.DictionaryPageModule),
      },
      {
        path: NAVIGATION_PATHS.learning,
        loadChildren: () => import('@bunch/web/learning/page').then((modules) => modules.LearningPageModule),
      },
      {
        path: NAVIGATION_PATHS.settings,
        loadChildren: () => import('@bunch/web/settings/page').then((modules) => modules.SettingsPageModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('@bunch/web/auth/pages').then((modules) => modules.AuthPagesModule),
  },
];

@NgModule({
  imports: [
    AuthGuardsModule,
    LayoutModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
