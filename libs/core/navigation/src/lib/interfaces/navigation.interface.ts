import { InjectionToken } from '@angular/core';

export interface NavigationPaths {
  home: string;
  dashboard: string;
  settings: string;
  dictionary: string;
  user: string;
  learning: string;

  auth: string;
  authLogin: string;
  authReset: string;
  authRegister: string;
  authPasswordChange: string;
  authWithGoogle: string;
  authWithApple: string;
  authOauth: string;

  // Errors
  serverError: string;
  notFound: string;
}

export const NAVIGATION_PATHS: NavigationPaths = {
  home: '',
  dashboard: 'dashboard',
  settings: 'settings',
  dictionary: 'dictionary',
  learning: 'learning',
  user: 'user',

  auth: 'auth',
  authLogin: 'auth/login',
  authReset: 'auth/reset',
  authRegister: 'auth/register',
  authPasswordChange: 'auth/password-change',
  authWithGoogle: 'auth/web/google',
  authWithApple: 'auth/web/apple',
  authOauth: 'auth/oauth/:token',

  serverError: 'server-error',
  notFound: 'not-found',
};

export interface NavigationLink {
  route: string;
  label: string;
  icon?: string;
  params?: Record<string, string>;
  routerLinkActiveOptions?: { exact: boolean };
}

export const PATHS = new InjectionToken<Record<string, string>>('NAVIGATION_PATHS');
