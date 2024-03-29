import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';

import { LocalDbKeys, LocalDBService } from '@bunch/core/localdb';
import { Group, GroupChange, GroupCreate } from '@bunch/groups/common';
import { User } from '@bunch/users/common';

@Injectable()
export class GroupManager {
  static storeName = LocalDbKeys.Groups;

  constructor(private readonly localDBService: LocalDBService) {}

  load(): Observable<Group[]> {
    return this.localDBService.getAll(GroupManager.storeName);
  }

  loadOne(uuid: string): Observable<Group | null> {
    return this.localDBService.get(GroupManager.storeName, uuid);
  }

  create(payload: GroupCreate, user: User): Observable<Group> {
    const currentDate = new Date().toISOString();
    const group: Group = {
      ...payload,
      cover: payload.cover ?? null,
      createdAt: currentDate,
      updatedAt: currentDate,
      owner: user.uuid,
      order: 1,
    };

    return this.localDBService.getAll(GroupManager.storeName).pipe(
      switchMap((records) => {
        const record = { ...group, order: records.length };

        return this.localDBService.put(GroupManager.storeName, record).pipe(map(() => record));
      })
    );
  }

  change(uuid: string, payload: GroupChange): Observable<Group> {
    return this.localDBService.get<Group>(GroupManager.storeName, uuid).pipe(
      switchMap((record) => {
        if (!record) {
          return throwError(() => of(`Entity #${uuid} not found`));
        }

        const updatedRecord = { ...record, ...payload };

        return this.localDBService.put(GroupManager.storeName, updatedRecord).pipe(map(() => updatedRecord));
      })
    );
  }

  remove(uuid: string): Observable<void> {
    return this.localDBService.remove(GroupManager.storeName, uuid);
  }

  sync(groups: Group[]): Observable<Group[]> {
    return this.localDBService
      .putAll(GroupManager.storeName, groups)
      .pipe(switchMap(() => this.localDBService.getAll<Group>(GroupManager.storeName)));
  }
}
