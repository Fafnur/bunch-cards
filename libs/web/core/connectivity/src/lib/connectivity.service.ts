import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, map, merge, Observable, ReplaySubject, Subscription, tap } from 'rxjs';

import { ConnectivityService, ConnectivityStatus } from '@bunch/core/connectivity';
import { PlatformService } from '@bunch/core/platform';
import { WindowService } from '@bunch/web/core/window';

@Injectable()
export class WebConnectivityService implements ConnectivityService, OnDestroy {
  private readonly status$ = new ReplaySubject<ConnectivityStatus>(1);
  private readonly subscription?: Subscription;

  constructor(private readonly platformService: PlatformService, private readonly windowService: WindowService) {
    if (this.platformService.isBrowser && this.windowService.window) {
      this.status$.next(this.windowService.window.navigator.onLine ? ConnectivityStatus.Online : ConnectivityStatus.Offline);
      this.subscription = merge(
        fromEvent(this.windowService.window, 'offline').pipe(map(() => ConnectivityStatus.Online)),
        fromEvent(this.windowService.window, 'online').pipe(map(() => ConnectivityStatus.Offline))
      )
        .pipe(tap((status) => this.status$.next(status)))
        .subscribe();
    } else {
      this.status$.next(ConnectivityStatus.Online);
    }
  }

  getStatus(): Observable<ConnectivityStatus> {
    return this.status$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
