import { Inject, Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

import { NavigationPaths, NavigationService, PATHS } from '@bunch/core/navigation';

@Injectable()
export class NativescriptNavigationService extends NavigationService {
  constructor(private readonly router: RouterExtensions, @Inject(PATHS) paths: NavigationPaths) {
    super(paths);
  }

  navigate(navigationPath: (string | number)[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(navigationPath, extras);
  }
}
