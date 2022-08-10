import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthResponse } from '@bunch/auth/common';
import { LocalDBService } from '@bunch/core/localdb';

@Injectable()
export class AuthManager {
  static storeName = 'tokens';

  constructor(private readonly localDBService: LocalDBService) {}

  get(): Observable<AuthResponse | null> {
    return this.localDBService.getAll<AuthResponse>(AuthManager.storeName).pipe(map((tokens) => (tokens.length > 0 ? tokens[0] : null)));
  }

  put(response: AuthResponse): Observable<void> {
    return this.localDBService.put(AuthManager.storeName, response);
  }

  remove(): Observable<void> {
    return this.localDBService.clear(AuthManager.storeName);
  }
}
