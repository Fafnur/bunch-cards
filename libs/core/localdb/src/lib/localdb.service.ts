import { Observable } from 'rxjs';

export enum LocalDbKeys {
  Cards = 'cards',
  Groups = 'groups',
  Users = 'users',
  Auth = 'tokens',
}

export type LocalDBRecord = Record<string, unknown> & { uuid: string };

/**
 * Local Database service for cross-platform storages. On web IndexedDB, for nativescript SQLite.
 */
export abstract class LocalDBService {
  abstract getAll<T = LocalDBRecord>(storeName: string): Observable<T[]>;
  abstract get<T = LocalDBRecord>(storeName: string, key: string): Observable<T | null>;
  abstract put<T = LocalDBRecord>(storeName: string, record: T): Observable<void>;
  abstract putAll<T = LocalDBRecord>(storeName: string, records: T[]): Observable<void>;
  abstract remove(storeName: string, key: string): Observable<void>;
  abstract clear(storeName: string): Observable<void>;
}
