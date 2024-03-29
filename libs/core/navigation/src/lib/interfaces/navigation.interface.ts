import { InjectionToken } from '@angular/core';

export interface NavigationPaths {
  home: string;
  dashboard: string;
  settings: string;
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
  authEmailConfirm: string;

  dictionary: string;
  groupsManagement: string;
  groupCreate: string;
  groupView: string;
  groupCardCreate: string;
  groupEdit: string;
  groupCardsEdit: string;

  cardsManagement: string;
  cardCreate: string;
  cardEdit: string;

  // Errors
  serverError: string;
  notFound: string;
}

export const NAVIGATION_PATHS: NavigationPaths = {
  home: '',
  dashboard: 'dashboard',
  settings: 'settings',
  learning: 'learning',
  user: 'user',

  auth: 'auth',
  authLogin: 'auth/login',
  authReset: 'auth/reset',
  authRegister: 'auth/register',
  authPasswordChange: 'auth/password/change',
  authWithGoogle: 'auth/web/google',
  authWithApple: 'auth/web/apple',
  authOauth: 'auth/oauth',
  authEmailConfirm: 'auth/email/confirm',

  dictionary: 'dictionary',
  groupsManagement: 'dictionary/groups',
  groupCreate: 'dictionary/groups/create',
  groupView: 'dictionary/groups/:uuid/view',
  groupCardCreate: 'dictionary/groups/:uuid/cards/create',
  groupEdit: 'dictionary/groups/:uuid/edit',
  groupCardsEdit: 'dictionary/groups/:uuid/cards/edit',

  cardsManagement: 'dictionary/cards',
  cardCreate: 'dictionary/cards/create',
  cardEdit: 'dictionary/cards/:uuid/edit',

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
