import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';
import { LayoutComponent } from '@bunch/nativescript/ui/layout';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: `/${NAVIGATION_PATHS.dashboard}`,
        pathMatch: 'full',
      },
      {
        path: NAVIGATION_PATHS.dashboard,
        loadChildren: () => import('@bunch/nativescript/dashboard/page').then((modules) => modules.DashboardPageModule),
      },
      {
        path: NAVIGATION_PATHS.dictionary,
        loadChildren: () => import('@bunch/nativescript/dictionary/page').then((modules) => modules.DictionaryPageModule),
      },
      {
        path: NAVIGATION_PATHS.learning,
        loadChildren: () => import('@bunch/nativescript/learning/page').then((modules) => modules.LearningPageModule),
      },
      {
        path: NAVIGATION_PATHS.settings,
        loadChildren: () => import('@bunch/nativescript/setting/page').then((modules) => modules.SettingPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
