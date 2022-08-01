import { Injectable, OnDestroy } from '@angular/core';
import { first, Observable, ReplaySubject } from 'rxjs';

import { LocalDBRecord, LocalDBService } from '@bunch/core/localdb';
import { PlatformService } from '@bunch/core/platform';
import { WindowService } from '@bunch/web/core/window';

@Injectable()
export class WebLocalDBService implements LocalDBService, OnDestroy {
  static version = 2;
  static dbname = 'bunchcards';

  private readonly database$ = new ReplaySubject<IDBDatabase>(1);

  constructor(private readonly windowService: WindowService, private readonly platformService: PlatformService) {
    if (this.platformService.isBrowser) {
      const onError = (error: unknown): void => {
        console.error(error);
        this.database$.complete();
      };

      const indexedDB = this.windowService.window?.indexedDB;
      if (!indexedDB) {
        onError('IndexedDB not available');
      } else {
        const openRequest = indexedDB.open(WebLocalDBService.dbname, WebLocalDBService.version);
        openRequest.onerror = () => onError(openRequest.error);
        openRequest.onsuccess = () => this.database$.next(openRequest.result);
        // TODO: Add update DB
        openRequest.onupgradeneeded = () => {
          try {
            const database: IDBDatabase = openRequest.result;
            database.createObjectStore('groups', { keyPath: 'uuid' });
          } catch (error) {
            onError(error);
          }
        };
      }
    }
  }

  ngOnDestroy(): void {
    this.database$.complete();
  }

  getAll<T = LocalDBRecord>(storeName: string): Observable<T[] | null> {
    return new Observable((observer) => {
      const onError = (error: unknown) => {
        console.log(error);
        observer.complete();
      };
      this.getDatabase().subscribe((database) => {
        try {
          const transaction = database.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const getRequest: IDBRequest<T[]> = store.getAll();

          getRequest.onerror = () => onError(getRequest.error);
          getRequest.onsuccess = () => {
            observer.next(getRequest.result);
            observer.complete();
          };
        } catch (err) {
          onError(err);
        }
      });
    });
  }

  get<T = LocalDBRecord>(storeName: string, key: string): Observable<T | null> {
    return new Observable((observer) => {
      const onError = (error: unknown) => {
        console.log(error);
        observer.complete();
      };
      this.getDatabase().subscribe((database) => {
        try {
          const transaction = database.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const getRequest: IDBRequest<T> = store.get(key);

          getRequest.onerror = () => onError(getRequest.error);
          getRequest.onsuccess = () => {
            observer.next(getRequest.result ?? null);
            observer.complete();
          };
        } catch (err) {
          onError(err);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  put<T = LocalDBRecord>(storeName: string, record: T, key: string): Observable<void> {
    return new Observable((observer) => {
      const onError = (error: unknown) => {
        console.error(error);
        observer.complete();
      };
      this.getDatabase().subscribe((database) => {
        try {
          const transaction = database.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const putRequest = store.put(record);
          putRequest.onerror = () => onError(putRequest.error);
          putRequest.onsuccess = () => {
            observer.next();
            observer.complete();
          };
        } catch (err) {
          onError(err);
        }
      });
    });
  }

  remove(storeName: string, key: string): Observable<void> {
    return new Observable((observer) => {
      const onError = (error: unknown) => {
        console.error(error);
        observer.complete();
      };
      this.getDatabase().subscribe((database) => {
        try {
          const transaction = database.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const putRequest = store.delete(key);
          putRequest.onerror = () => onError(putRequest.error);
          putRequest.onsuccess = () => {
            observer.next();
            observer.complete();
          };
        } catch (err) {
          onError(err);
        }
      });
    });
  }

  clear(storeName: string): Observable<void> {
    return new Observable((observer) => {
      this.getDatabase().subscribe((database) => {
        try {
          database.transaction([storeName], 'readwrite').objectStore(storeName).clear();
        } catch (error) {
          console.error(error);
        }
        observer.complete();
      });
    });
  }

  private getDatabase(): Observable<IDBDatabase> {
    return this.database$.pipe(first());
  }
}
