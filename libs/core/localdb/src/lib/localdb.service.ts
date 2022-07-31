import { Observable } from 'rxjs';

/**
 * Local Database service for cross-platform storages. On web IndexedDB, for nativescript SQLite.
 */
export abstract class LocalDBService {
  abstract getAll<T = Record<string, unknown>>(storeName: string): Observable<T[] | null>;
  abstract get<T = Record<string, unknown>>(storeName: string, key: string): Observable<T | null>;
  abstract put<T = Record<string, unknown>>(storeName: string, record: T): Observable<void>;
  abstract remove(storeName: string, key: string): Observable<void>;
  abstract clear(storeName: string): Observable<void>;
}
