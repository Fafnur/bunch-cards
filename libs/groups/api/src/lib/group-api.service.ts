import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@bunch/core/api';
import { Group, GroupChange, GroupCreate, GroupDto } from '@bunch/groups/common';

export const GROUP_API_ROUTES = {
  load: '/groups',
  loadOne: (uuid: string) => `/groups/${uuid}`,
  create: '/groups',
  change: (uuid: string) => `/groups/${uuid}`,
  delete: (uuid: string) => `/groups/${uuid}`,
};

@Injectable()
export class GroupApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Group[]> {
    return this.apiService.get<GroupDto[]>(GROUP_API_ROUTES.load);
  }

  loadOne(uuid: string): Observable<Group | null> {
    return this.apiService.get<GroupDto | null>(GROUP_API_ROUTES.loadOne(uuid));
  }

  create(payload: GroupCreate): Observable<Group> {
    return this.apiService.post<GroupDto>(GROUP_API_ROUTES.create, payload);
  }

  change(uuid: string, payload: GroupChange): Observable<Group> {
    return this.apiService.patch<GroupDto>(GROUP_API_ROUTES.change(uuid), payload);
  }

  remove(uuid: string): Observable<void> {
    return this.apiService.delete(GROUP_API_ROUTES.change(uuid));
  }
}
