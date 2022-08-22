import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly navigationService: NavigationService,
    private readonly authFacade: AuthFacade
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.logged$.pipe(
      isNotNullOrUndefined(),
      take(1),
      map((logged) => !logged || this.router.createUrlTree(this.navigationService.getRoute(this.navigationService.getPaths().dashboard)))
    );
  }
}
