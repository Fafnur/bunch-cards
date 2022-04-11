import { Inject, Injectable, Optional } from '@angular/core';

import {
  ENVIRONMENTS,
  Environments,
  ENVIRONMENTS_DEFAULT,
} from './environment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly environments: Environments;

  constructor(
    @Optional() @Inject(ENVIRONMENTS) environments: Environments | null
  ) {
    this.environments = environments ?? ENVIRONMENTS_DEFAULT;
  }

  getEnvironments(): Environments {
    return this.environments;
  }
}
