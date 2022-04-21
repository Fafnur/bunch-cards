import { InjectionToken } from '@angular/core';

export interface NavigationPaths {
  dashboard: string;
  settings: string;
  dictionary: string;
  user: string;
  learning: string;

  // Errors
  serverError: string;
  notFound: string;
}

export const NAVIGATION_PATHS: NavigationPaths = {
  dashboard: '',
  settings: 'settings',
  dictionary: 'dictionary',
  learning: 'learning',
  user: 'user',

  serverError: 'server-error',
  notFound: 'not-found',
};

export interface NavigationLink {
  route: string;
  label: string;
  params?: Record<string, string>;
  routerLinkActiveOptions?: { exact: boolean };
}

export const PATHS = new InjectionToken<Record<string, string>>('NAVIGATION_PATHS');
