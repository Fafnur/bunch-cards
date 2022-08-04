import { Injectable } from '@angular/core';
import { CouchBase } from '@triniwiz/nativescript-couchbase';
import { Observable } from 'rxjs';

import { LocalDBRecord, LocalDBService } from '@bunch/core/localdb';

@Injectable()
export class NativescriptLocalDBService implements LocalDBService {
  static version = 1;

  getAll<T = LocalDBRecord>(storeName: string): Observable<T[]> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        const records = database.query({ select: [] });
        observer.next(records ?? []);
        observer.complete();
        database.close();
      } catch (err) {
        console.log(err);
        observer.complete();
      }
    });
  }

  get<T = LocalDBRecord>(storeName: string, key: string): Observable<T | null> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        const record = database.getDocument(key);
        observer.next(record ?? null);
        observer.complete();
        database.close();
      } catch (err) {
        console.log(err);
        observer.complete();
      }
    });
  }

  put<T = LocalDBRecord>(storeName: string, record: T): Observable<void> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        database.createDocument(record, (record as any).uuid);
        observer.next();
        observer.complete();
        database.close();
      } catch (err) {
        console.error(err);
        observer.complete();
      }
    });
  }

  putAll<T = LocalDBRecord>(storeName: string, records: T[]): Observable<void> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        database.inBatch(() => {
          for (const record of records) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            database.createDocument(record, (record as any).uuid);
          }
          observer.next();
          observer.complete();
          database.close();
        });
      } catch (err) {
        console.error(err);
        observer.complete();
      }
    });
  }

  remove(storeName: string, key: string): Observable<void> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        database.deleteDocument(key);
        observer.next();
        observer.complete();
        database.close();
      } catch (err) {
        console.error(err);
        observer.complete();
      }
    });
  }

  clear(storeName: string): Observable<void> {
    return new Observable((observer) => {
      try {
        const database = new CouchBase(storeName);
        database.destroyDatabase();
        database.close();
      } catch (error) {
        console.error(error);
      }
      observer.complete();
    });
  }
}
