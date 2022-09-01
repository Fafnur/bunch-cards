import { Injectable } from '@angular/core';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, switchMap, take, tap } from 'rxjs';

import { selectLogged } from '@bunch/auth/state';
import { ConnectivityService } from '@bunch/core/connectivity';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { UserApiService } from '@bunch/users/api';
import { UserFacade } from '@bunch/users/state';

@Injectable()
export class UserSyncService {
  constructor(
    private readonly userApiService: UserApiService,
    private readonly userFacade: UserFacade,
    private readonly connectivityService: ConnectivityService,
    private readonly store: Store
  ) {}

  // TODO: Change logic
  sync(): void {
    this.store
      .select(selectLogged)
      .pipe(
        isNotNullOrUndefined(),
        take(1),
        concatLatestFrom(() => this.connectivityService.online()),
        filter(([logged, online]) => online && logged),
        switchMap(() => this.userApiService.load()),
        // TODO: Check user and save?!
        tap((user) => this.userFacade.sync(user))
      )
      .subscribe();
  }
}
