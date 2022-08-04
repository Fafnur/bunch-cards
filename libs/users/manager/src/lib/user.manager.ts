import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';

import { LocalDBService } from '@bunch/core/localdb';
import { User, UserChange } from '@bunch/users/common';

@Injectable()
export class UserManager {
  static storeName = 'users';

  constructor(private readonly localDBService: LocalDBService) {}

  load(): Observable<User | null> {
    return this.localDBService.getAll<User>(UserManager.storeName).pipe(map((users) => (users.length > 0 ? users[0] : null)));
  }

  loadOne(uuid: string): Observable<User | null> {
    return this.localDBService.get(UserManager.storeName, uuid);
  }

  change(payload: UserChange): Observable<User> {
    return this.localDBService.get<User>(UserManager.storeName, payload.uuid).pipe(
      switchMap((record) => {
        if (!record) {
          return throwError(() => of(`User not found`));
        }

        const updatedRecord = { ...record, ...payload };

        return this.localDBService.put(UserManager.storeName, updatedRecord).pipe(map(() => updatedRecord));
      })
    );
  }

  sync(user: User): Observable<void> {
    return this.localDBService.put(UserManager.storeName, user);
  }
}
