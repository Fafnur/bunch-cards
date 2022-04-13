import { InjectionToken } from '@angular/core';

export interface Environments {
  production: boolean;
  brand: string;
  appHost: string;
}

export const ENVIRONMENTS = new InjectionToken<Partial<Environments>>(
  'ENVIRONMENTS'
);

export const ENVIRONMENTS_DEFAULT: Environments = {
  production: false,
  brand: 'Bunch',
  appHost: 'http://localhost:4200',
};
