import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NAVIGATION_PATHS } from '@bunch/core/navigation';
import { AuthLayoutComponent } from '@bunch/web/auth/ui/layout';

const routes: Routes = [
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.authLogin,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: NAVIGATION_PATHS.authLogin,
        loadChildren: () => import('@bunch/web/auth/login/page').then((modules) => modules.LoginPageModule),
      },
      {
        path: NAVIGATION_PATHS.authRegister,
        loadChildren: () => import('@bunch/web/auth/register/page').then((modules) => modules.RegisterPageModule),
      },
      {
        path: NAVIGATION_PATHS.authReset,
        loadChildren: () => import('@bunch/web/auth/reset/page').then((modules) => modules.ResetPageModule),
      },
      {
        path: NAVIGATION_PATHS.authOauth,
        loadChildren: () => import('@bunch/web/auth/oauth/page').then((modules) => modules.OauthPageModule),
      },
      {
        path: NAVIGATION_PATHS.authPasswordChange,
        loadChildren: () => import('@bunch/web/auth/password-change/page').then((modules) => modules.PasswordChangePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagesRoutingModule {}
