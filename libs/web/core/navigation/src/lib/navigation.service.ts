import { Inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { NavigationPaths, NavigationService, PATHS } from '@bunch/core/navigation';

@Injectable()
export class WebNavigationService extends NavigationService {
  constructor(private readonly router: Router, @Inject(PATHS) paths: NavigationPaths) {
    super(paths);
  }

  navigate(navigationPath: (string | number)[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(navigationPath, extras);
  }
}
