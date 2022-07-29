import { Injectable, OnDestroy } from '@angular/core';
import { filter, Observable, Observer, of, ReplaySubject, switchMap, take } from 'rxjs';

import { PlatformService } from '@bunch/core/platform';
import { WindowService } from '@bunch/web/core/window';

@Injectable()
export class WebLocalDBService implements OnDestroy {
  static version = 1;
  static dbname = 'bunchcards';

  private database$ = new ReplaySubject<IDBDatabase>(1);

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
      }
    }
  }

  ngOnDestroy(): void {
    this.database$.complete();
  }

  getDatabase(): Observable<IDBDatabase> {
    return this.database$.asObservable();
  }

  get<T = Record<string, unknown>>(storeName: string): Observable<T[]> {
    return this.getDatabase().pipe(
      switchMap((database) => {
        const transaction = database.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const getRequest: IDBRequest<T[]> = store.getAll();

        return of([]);
      })
    );
  }

  // db = new ReplaySubject<IDBDatabase>(1);
  //
  // $db = this.db.pipe(
  //   take(1),
  //   filter((db) => !!db)
  // );
  //
  // constructor(private readonly windowService: WindowService, private readonly platformService: PlatformService) {
  //   if (this.platformService.isBrowser) {
  //     const onError = (error: unknown) => {
  //       console.error(error);
  //       this.db.complete();
  //     };
  //
  //     if (!this.windowService.window?.indexedDB) {
  //       onError('IndexedDB not available');
  //     } else {
  //       const openRequest = indexedDB.open(WebLocalDBService.dbname, WebLocalDBService.version);
  //       openRequest.onerror = () => onError(openRequest.error);
  //       openRequest.onsuccess = () => this.db.next(openRequest.result);
  //       openRequest.onupgradeneeded = () => {
  //         try {
  //           const db: IDBDatabase = openRequest.result;
  //           const cacheStore = db.createObjectStore('store', { keyPath: 'key' });
  //           cacheStore.createIndex('value', 'value');
  //           cacheStore.createIndex('timestamp', 'timestamp');
  //           cacheStore.createIndex('ttl', 'ttl');
  //         } catch (error) {
  //           onError(error);
  //         }
  //       };
  //     }
  //   }
  // }
  //
  // get<T = Record<string, unknown>>(storeName: string, key: string): Observable<T | null> {
  //   return new Observable((observer) => {
  //     const onError = (error: unknown) => {
  //       console.log(error);
  //       observer.complete();
  //     };
  //     this.$db.subscribe((db) => {
  //       try {
  //         const txn = db.transaction([storeName], 'readonly');
  //         const store = txn.objectStore(storeName);
  //         const getRequest: IDBRequest<Record> = store.get(key);
  //         getRequest.onerror = () => onError(getRequest.error);
  //         getRequest.onsuccess = () => {
  //           const record = getRequest.result;
  //           if (!record || new Date(Date.now() - record.timestamp).getSeconds() > record.ttl) {
  //             observer.next(null);
  //           } else {
  //             observer.next(getRequest.result);
  //           }
  //           observer.complete();
  //         };
  //       } catch (err) {
  //         onError(err);
  //       }
  //     });
  //   });
  // }
  //
  // put<T = Record<string, unknown>>(storeName: string, value: T): Observable<void> {
  //   return new Observable((observer) => {
  //     const onError = (error: unknown) => {
  //       console.error(error);
  //       observer.complete();
  //     };
  //     this.$db.subscribe((db) => {
  //       try {
  //         const txn = db.transaction([storeName], 'readwrite');
  //         const store = txn.objectStore(storeName);
  //         const record = { ...value, timestamp: Date.now() };
  //         const putRequest = store.put(record);
  //         putRequest.onerror = () => onError(putRequest.error);
  //         putRequest.onsuccess = () => {
  //           // putRequest.result
  //           observer.next();
  //           observer.complete();
  //         };
  //       } catch (err) {
  //         onError(err);
  //       }
  //     });
  //   });
  // }
  //
  // clear(storeName: string): Observable<void> {
  //   return new Observable((observer: Observer<void>) => {
  //     this.$db.subscribe((db) => {
  //       try {
  //         db.transaction([storeName], 'readwrite').objectStore(storeName).clear();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
}
