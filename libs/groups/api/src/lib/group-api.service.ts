import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiService } from '@bunch/core/api';
import { Group, GroupChange, GroupCreate, GroupDto } from '@bunch/groups/common';

export const GROUP_API_ROUTES = {
  load: '/groups',
  loadOne: (uuid: string) => `/groups/${uuid}`,
  create: '/groups',
  change: (uuid: string) => `/groups/${uuid}`,
  delete: (uuid: string) => `/groups/${uuid}`,
};

export function castGroup(group: GroupDto): Group {
  return { ...group, cards: group.cards.map((card) => card.uuid) };
}

@Injectable()
export class GroupApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Group[]> {
    return this.apiService.get<GroupDto[]>(GROUP_API_ROUTES.load).pipe(map((groups) => groups.map(castGroup)));
  }

  loadOne(uuid: string): Observable<Group | null> {
    return this.apiService.get<GroupDto | null>(GROUP_API_ROUTES.loadOne(uuid)).pipe(map((group) => (group ? castGroup(group) : null)));
  }

  create(payload: GroupCreate): Observable<Group> {
    return this.apiService.post<GroupDto>(GROUP_API_ROUTES.create, payload).pipe(map((group) => castGroup(group)));
  }

  change(uuid: string, payload: GroupChange): Observable<Group> {
    return this.apiService.patch<GroupDto>(GROUP_API_ROUTES.change(uuid), payload).pipe(map((group) => castGroup(group)));
  }

  remove(uuid: string): Observable<void> {
    return this.apiService.delete(GROUP_API_ROUTES.change(uuid));
  }
}
