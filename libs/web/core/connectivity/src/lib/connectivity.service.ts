import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, map, merge, Observable, ReplaySubject, Subject, Subscription, tap } from 'rxjs';

import { ConnectivityService, ConnectivityStatus } from '@bunch/core/connectivity';
import { PlatformService } from '@bunch/core/platform';
import { WindowService } from '@bunch/web/core/window';

@Injectable()
export class WebConnectivityService implements ConnectivityService, OnDestroy {
  private isOnline = true;
  private readonly status$ = new ReplaySubject<ConnectivityStatus>(1);
  private readonly disconnecting$ = new Subject<void>();
  private readonly subscription?: Subscription;

  constructor(private readonly platformService: PlatformService, private readonly windowService: WindowService) {
    if (this.platformService.isBrowser && this.windowService.window) {
      // First detect
      const isOnline = this.windowService.window.navigator.onLine;
      this.status$.next(isOnline ? ConnectivityStatus.Online : ConnectivityStatus.Offline);
      if (this.isOnline !== isOnline) {
        this.disconnecting$.next();
      }
      this.isOnline = isOnline;

      this.subscription = merge(
        fromEvent(this.windowService.window, 'offline').pipe(map(() => ConnectivityStatus.Online)),
        fromEvent(this.windowService.window, 'online').pipe(map(() => ConnectivityStatus.Offline))
      )
        .pipe(
          tap((status) => {
            if (status === ConnectivityStatus.Offline && this.isOnline) {
              this.disconnecting$.next();
            }
            this.isOnline = status === ConnectivityStatus.Online;
            this.status$.next(status);
          })
        )
        .subscribe();
    } else {
      this.status$.next(ConnectivityStatus.Online);
    }
  }

  getStatus(): Observable<ConnectivityStatus> {
    return this.status$.asObservable();
  }

  disconnecting(): Observable<void> {
    return this.disconnecting$.asObservable();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
