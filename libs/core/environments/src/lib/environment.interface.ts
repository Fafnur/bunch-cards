import { InjectionToken } from '@angular/core';

export interface Environments {
  production: boolean;
}

export const ENVIRONMENTS = new InjectionToken<Environments>('ENVIRONMENTS');

export const ENVIRONMENTS_DEFAULT: Environments = {
  production: false,
};
