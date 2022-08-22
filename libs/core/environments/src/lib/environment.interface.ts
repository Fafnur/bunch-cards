import { InjectionToken } from '@angular/core';

export interface Environments {
  production: boolean;
  brand: string;
  appHost: string;
  apiHost: string;
}

export const ENVIRONMENTS = new InjectionToken<Partial<Environments>>('ENVIRONMENTS');

export const ENVIRONMENTS_DEFAULT: Environments = {
  production: false,
  brand: 'Bunch Cards',
  appHost: 'http://localhost:4200',
  apiHost: 'http://localhost:3000',
};
