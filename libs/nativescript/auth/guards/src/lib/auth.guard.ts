import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable, take, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly routerExtensions: RouterExtensions,
    private readonly navigationService: NavigationService,
    private readonly authFacade: AuthFacade
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.logged$.pipe(
      isNotNullOrUndefined(),
      take(1),
      tap((logged) => {
        if (!logged) {
          void this.routerExtensions.navigate(this.navigationService.getRoute(this.navigationService.getPaths().authLogin));
        }
      }),
      map((logged) => logged)
    );
  }
}
