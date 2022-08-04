import { EMPTY, Observable } from 'rxjs';

import { LocalDBRecord, LocalDBService } from './localdb.service';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class LocalDBServiceStub implements LocalDBService {
  clear(storeName: string): Observable<void> {
    return EMPTY;
  }

  get<T = LocalDBRecord>(storeName: string, key: string): Observable<T | null> {
    return EMPTY;
  }

  getAll<T = LocalDBRecord>(storeName: string): Observable<T[]> {
    return EMPTY;
  }

  put<T = LocalDBRecord>(storeName: string, record: T): Observable<void> {
    return EMPTY;
  }

  putAll<T = LocalDBRecord>(storeName: string, record: T[]): Observable<void> {
    return EMPTY;
  }

  remove(storeName: string, key: string): Observable<void> {
    return EMPTY;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
