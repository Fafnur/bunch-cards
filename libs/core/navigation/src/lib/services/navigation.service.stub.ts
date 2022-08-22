import { NavigationExtras } from '@angular/router';

import { NAVIGATION_PATHS } from '../interfaces/navigation.interface';
import { NavigationService } from './navigation.service';

export class NavigationServiceStub extends NavigationService {
  constructor() {
    super(NAVIGATION_PATHS);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigate(navigationPath: (string | number)[], extras?: NavigationExtras): Promise<boolean> {
    return new Promise<boolean>((resolve) => resolve(true));
  }
}
