import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';
import { LayoutComponent } from '@bunch/web/ui/layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: NAVIGATION_PATHS.dashboard,
        loadChildren: () => import('@bunch/web/dashboard/page').then((modules) => modules.DashboardPageModule),
      },
      {
        path: NAVIGATION_PATHS.settings,
        loadChildren: () => import('@bunch/web/settings/page').then((modules) => modules.SettingsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
