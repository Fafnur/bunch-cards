import { Observable } from 'rxjs';

/**
 * Local Database service for cross-platform storages. On web IndexedDB, for nativescript SQLite.
 */
export abstract class LocalDBService {
  abstract get<T = Record<string, unknown>>(storeName: string, key: string): Observable<T | null>;
  abstract put<T = Record<string, unknown>>(storeName: string, value: T): Observable<void>;
}
