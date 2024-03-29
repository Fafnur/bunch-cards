import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { ApiService } from '@bunch/core/api';
import { GROUP_CHANGE_STUB, GROUP_CREATE_STUB, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';

import { GROUP_API_ROUTES, GroupApiService } from './group-api.service';

describe('GroupApiService', () => {
  let service: GroupApiService;
  let apiServiceMock: ApiService;

  beforeAll(() => {
    apiServiceMock = mock(ApiService);
    service = new GroupApiService(instance(apiServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call load()', () => {
    const result = hot('a', { a: GROUPS_STUB });
    when(apiServiceMock.get(GROUP_API_ROUTES.load)).thenReturn(result);

    expect(service.load()).toBeObservable(result);
  });

  it('should call loadOne()', () => {
    const result = hot('a', { a: GROUP_STUB });
    when(apiServiceMock.get(GROUP_API_ROUTES.loadOne(GROUP_STUB.uuid))).thenReturn(result);

    expect(service.loadOne(GROUP_STUB.uuid)).toBeObservable(result);
  });

  it('should call create()', () => {
    const result = hot('a', { a: GROUP_STUB });
    when(apiServiceMock.post(GROUP_API_ROUTES.create, deepEqual(GROUP_CREATE_STUB))).thenReturn(result);

    expect(service.create(GROUP_CREATE_STUB)).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('a', { a: GROUP_STUB });
    when(apiServiceMock.patch(GROUP_API_ROUTES.change(GROUP_STUB.uuid), deepEqual(GROUP_CHANGE_STUB))).thenReturn(result);

    expect(service.change(GROUP_STUB.uuid, GROUP_CHANGE_STUB)).toBeObservable(result);
  });

  it('should call remove()', () => {
    const result = hot('a', { a: null });
    when(apiServiceMock.delete(GROUP_API_ROUTES.change(GROUP_STUB.uuid))).thenReturn(result);

    expect(service.remove(GROUP_STUB.uuid)).toBeObservable(result);
  });

  it('should call sync()', () => {
    const result = hot('a', { a: GROUPS_STUB });
    when(apiServiceMock.put(GROUP_API_ROUTES.sync, deepEqual(GROUPS_STUB))).thenReturn(result);

    expect(service.sync(GROUPS_STUB)).toBeObservable(result);
  });
});
