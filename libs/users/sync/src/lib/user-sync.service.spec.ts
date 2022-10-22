import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { selectLogged } from '@bunch/auth/state';
import { ConnectivityService, ConnectivityServiceStub } from '@bunch/core/connectivity';
import { UserApiService } from '@bunch/users/api';
import { User } from '@bunch/users/common';
import { UserFacade } from '@bunch/users/state';

import { UserSyncService } from './user-sync.service';

describe('UserSyncService', () => {
  let service: UserSyncService;
  let userApiServiceMock: UserApiService;
  let userFacadeMock: UserFacade;
  let connectivityServiceMock: ConnectivityService;
  let store: Store;

  let logged$: ReplaySubject<boolean>;
  let online$: ReplaySubject<boolean>;
  let load$: ReplaySubject<User>;

  beforeEach(() => {
    userApiServiceMock = mock(UserApiService);
    userFacadeMock = mock(UserFacade);
    connectivityServiceMock = mock(ConnectivityServiceStub);
    store = mock(Store);

    when(store.select(deepEqual(selectLogged))).thenReturn(logged$);
    when(connectivityServiceMock.online()).thenReturn(online$);
    when(userApiServiceMock.load()).thenReturn(load$);

    service = new UserSyncService(
      instance(userApiServiceMock),
      instance(userFacadeMock),
      instance(connectivityServiceMock),
      instance(store)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
