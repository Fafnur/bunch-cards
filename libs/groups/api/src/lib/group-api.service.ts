import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@bunch/core/api';
import { Group, GroupChange, GroupCreate } from '@bunch/groups/common';

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
    return this.apiService.get(GROUP_API_ROUTES.load);
  }

  loadOne(id: number): Observable<Group | null> {
    return this.apiService.get(GROUP_API_ROUTES.loadOne(id));
  }

  create(payload: GroupCreate): Observable<Group> {
    return this.apiService.post(GROUP_API_ROUTES.create, payload);
  }

  change(id: number, payload: GroupChange): Observable<Group> {
    return this.apiService.patch(GROUP_API_ROUTES.change(id), payload);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(GROUP_API_ROUTES.change(id));
  }
}
