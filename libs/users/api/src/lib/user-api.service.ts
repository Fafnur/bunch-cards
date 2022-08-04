import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@bunch/core/api';
import { User, UserChange } from '@bunch/users/common';

export const USER_API_ROUTES = {
  load: '/users',
  change: '/users',
};

@Injectable()
export class UserApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<User> {
    return this.apiService.get(USER_API_ROUTES.load);
  }

  change(payload: UserChange): Observable<User> {
    return this.apiService.patch(USER_API_ROUTES.change, payload);
  }
}
