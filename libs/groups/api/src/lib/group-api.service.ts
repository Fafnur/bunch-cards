import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@bunch/core/api';
import { Group, GroupChange, GroupCreate, GroupDto } from '@bunch/groups/common';

export const GROUP_API_ROUTES = {
  load: '/groups',
  loadOne: (id: number) => `/groups/${id}`,
  create: '/groups',
  change: (id: number) => `/groups/${id}`,
  delete: (id: number) => `/groups/${id}`,
};

@Injectable()
export class GroupApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Group[]> {
    return this.apiService.get<GroupDto[]>(GROUP_API_ROUTES.load);
  }

  loadOne(id: number): Observable<Group | null> {
    return this.apiService.get<GroupDto | null>(GROUP_API_ROUTES.loadOne(id));
  }

  create(payload: GroupCreate): Observable<Group> {
    return this.apiService.post<GroupDto>(GROUP_API_ROUTES.create, payload);
  }

  change(id: number, payload: GroupChange): Observable<Group> {
    return this.apiService.patch<GroupDto>(GROUP_API_ROUTES.change(id), payload);
  }

  remove(id: number): Observable<void> {
    return this.apiService.delete(GROUP_API_ROUTES.change(id));
  }
}
