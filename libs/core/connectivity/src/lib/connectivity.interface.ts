import { Observable } from 'rxjs';

export enum ConnectivityStatus {
  Online = 'online',
  Offline = 'offline',
}

/**
 * Abstract interface for ConnectivityService. Web and nativescript platforms have different implementations.
 */
export abstract class ConnectivityService {
  abstract getStatus(): Observable<ConnectivityStatus>;
}
