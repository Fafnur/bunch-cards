import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Connectivity } from '@nativescript/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { ConnectivityService, ConnectivityStatus } from '@bunch/core/connectivity';

@Injectable()
export class NativescriptConnectivityService implements ConnectivityService, OnDestroy {
  private isOnline = true;
  private readonly status$ = new ReplaySubject<ConnectivityStatus>(1);
  private readonly disconnecting$ = new Subject<void>();

  constructor(private readonly zone: NgZone) {
    Connectivity.startMonitoring((connectionType) => {
      this.zone.run(() => {
        let isOnline: boolean;

        switch (connectionType) {
          case Connectivity.connectionType.none:
            isOnline = false;
            break;
          // Maybe need add VPN?
          case Connectivity.connectionType.wifi:
          case Connectivity.connectionType.mobile:
            isOnline = true;
            break;
          default:
            isOnline = false;
            break;
        }

        if (this.isOnline && !isOnline) {
          this.disconnecting$.next();
        }
        this.isOnline = isOnline;
        this.status$.next(isOnline ? ConnectivityStatus.Online : ConnectivityStatus.Offline);
      });
    });
  }

  getStatus(): Observable<ConnectivityStatus> {
    return this.status$.asObservable();
  }

  disconnecting(): Observable<void> {
    return this.disconnecting$.asObservable();
  }

  ngOnDestroy(): void {
    Connectivity.stopMonitoring();
  }
}
