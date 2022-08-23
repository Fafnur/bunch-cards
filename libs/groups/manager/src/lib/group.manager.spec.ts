import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { LocalDBService, LocalDBServiceStub } from '@bunch/core/localdb';
import { GROUP_CHANGE_STUB, GROUP_CREATE_STUB, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';
import { USER_STUB } from '@bunch/users/common';

import { GroupManager } from './group.manager';

describe('GroupManager', () => {
  let service: GroupManager;
  let localDBServiceMock: LocalDBService;

  beforeAll(() => {
    localDBServiceMock = mock(LocalDBServiceStub);
    service = new GroupManager(instance(localDBServiceMock));
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call load()', () => {
    const result = hot('a', { a: GROUPS_STUB });
    when(localDBServiceMock.getAll(GroupManager.storeName)).thenReturn(result);

    expect(service.load()).toBeObservable(result);
  });

  it('should call loadOne()', () => {
    const result = hot('a', { a: GROUP_STUB });
    when(localDBServiceMock.get(GroupManager.storeName, GROUP_STUB.uuid)).thenReturn(result);

    expect(service.loadOne(GROUP_STUB.uuid)).toBeObservable(result);
  });

  it('should call create()', () => {
    const mockDate = new Date(GROUP_STUB.createdAt);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn<any, any>(global, 'Date').mockImplementation(() => mockDate);

    const result = hot('-a', { a: { ...GROUP_STUB, owner: USER_STUB.uuid } });
    when(localDBServiceMock.getAll(GroupManager.storeName)).thenReturn(hot('a', { a: [{}] }));
    when(localDBServiceMock.put(GroupManager.storeName, deepEqual({ ...GROUP_STUB, owner: USER_STUB.uuid }))).thenReturn(result);

    expect(service.create(GROUP_CREATE_STUB, USER_STUB)).toBeObservable(result);
  });

  it('should call change()', () => {
    const result = hot('-a', { a: GROUP_STUB });
    when(localDBServiceMock.get(GroupManager.storeName, GROUP_STUB.uuid)).thenReturn(hot('a', { a: GROUP_STUB }));
    when(localDBServiceMock.put(GroupManager.storeName, deepEqual(GROUP_STUB))).thenReturn(result);

    expect(service.change(GROUP_STUB.uuid, GROUP_CHANGE_STUB)).toBeObservable(result);
  });

  it('should call remove()', () => {
    const result = hot('a', { a: null });
    when(localDBServiceMock.remove(GroupManager.storeName, GROUP_STUB.uuid)).thenReturn(result);

    expect(service.remove(GROUP_STUB.uuid)).toBeObservable(result);
  });

  it('should call sync()', () => {
    const result = hot('a', { a: null });
    when(localDBServiceMock.putAll(GroupManager.storeName, deepEqual(GROUPS_STUB))).thenReturn(result);

    expect(service.sync(GROUPS_STUB)).toBeObservable(result);
  });
});
