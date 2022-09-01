import { EMPTY, Observable, of } from 'rxjs';

import { ConnectivityService, ConnectivityStatus } from './connectivity.interface';

export class ConnectivityServiceStub implements ConnectivityService {
  disconnecting(): Observable<void> {
    return EMPTY;
  }

  getStatus(): Observable<ConnectivityStatus> {
    return of(ConnectivityStatus.Online);
  }

  online(): Observable<boolean> {
    return of(true);
  }
}
