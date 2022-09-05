import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavigationService } from '@bunch/core/navigation';
import { GroupManager } from '@bunch/groups/manager';

@Injectable()
export class GroupEditGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly navigationService: NavigationService,
    private readonly groupManager: GroupManager
  ) {}

  canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | UrlTree {
    const { uuid } = snapshot.params;
    if (!uuid) {
      return this.getUrl();
    }

    return this.groupManager.loadOne(uuid).pipe(
      take(1),
      map((group) => !!group || this.getUrl())
    );
  }

  private getUrl(): UrlTree {
    return this.router.createUrlTree(this.navigationService.getRoute(this.navigationService.getPaths().groupsManagement));
  }
}
