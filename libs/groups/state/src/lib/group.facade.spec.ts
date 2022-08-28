import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { HTTP_ERROR_STUB } from '@bunch/core/api';
import { GROUP_CHANGE_STUB, GROUP_CREATE_STUB, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';

import * as GroupActions from './group.actions';
import { GroupFacade } from './group.facade';
import { GROUP_FEATURE_KEY, initialGroupState } from './group.reducer';
import * as GroupSelectors from './group.selectors';

describe('GroupFacade', () => {
  let actions: Observable<unknown>;
  let facade: GroupFacade;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupFacade,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: { [GROUP_FEATURE_KEY]: initialGroupState },
          selectors: [
            { selector: GroupSelectors.selectLoaded, value: true },
            { selector: GroupSelectors.selectGroups, value: GROUPS_STUB },
          ],
        }),
      ],
    });

    facade = TestBed.inject(GroupFacade);
    store = TestBed.inject(MockStore);

    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(facade).toBeTruthy();
  });

  it('should return loaded$', () => {
    const expected = hot('a', { a: true });

    expect(facade.loaded$).toBeObservable(expected);
  });

  it('should return groups$', () => {
    const expected = hot('a', { a: GROUPS_STUB });

    expect(facade.groups$).toBeObservable(expected);
  });

  it('should emit loadSuccess$', () => {
    const action = GroupActions.loadSuccess({ groups: GROUPS_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: GROUPS_STUB });

    expect(facade.loadSuccess$).toBeObservable(expected);
  });

  it('should emit loadFailure$', () => {
    const action = GroupActions.loadFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loadFailure$).toBeObservable(expected);
  });

  it('should emit loadOneSuccess$', () => {
    const action = GroupActions.loadOneSuccess({ uuid: GROUP_STUB.uuid, group: GROUP_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: GROUP_STUB });

    expect(facade.loadOneSuccess$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit loadOneFailure$', () => {
    const action = GroupActions.loadOneFailure({ uuid: GROUP_STUB.uuid, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loadOneFailure$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit createSuccess$', () => {
    const action = GroupActions.createSuccess({ group: GROUP_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: GROUP_STUB });

    expect(facade.createSuccess$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit createFailure$', () => {
    const action = GroupActions.createFailure({ groupCreate: GROUP_CREATE_STUB, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.createFailure$(GROUP_CREATE_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit changeSuccess$', () => {
    const action = GroupActions.changeSuccess({ group: GROUP_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: GROUP_STUB });

    expect(facade.changeSuccess$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit changeFailure$', () => {
    const action = GroupActions.changeFailure({ uuid: GROUP_STUB.uuid, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.changeFailure$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit removeSuccess$', () => {
    const action = GroupActions.removeSuccess({ uuid: GROUP_STUB.uuid });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: undefined });

    expect(facade.removeSuccess$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('should emit removeFailure$', () => {
    const action = GroupActions.removeFailure({ uuid: GROUP_STUB.uuid, error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.removeFailure$(GROUP_STUB.uuid)).toBeObservable(expected);
  });

  it('load() should dispatch action', () => {
    facade.load();

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.load());
  });

  it('loadOne() should dispatch action', () => {
    facade.loadOne(GROUP_STUB.uuid);

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.loadOne({ uuid: GROUP_STUB.uuid }));
  });

  it('create() should dispatch action', () => {
    facade.create(GROUP_CREATE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.create({ groupCreate: GROUP_CREATE_STUB }));
  });

  it('change() should dispatch action', () => {
    facade.change(GROUP_CHANGE_STUB.uuid, GROUP_CHANGE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.change({ uuid: GROUP_CHANGE_STUB.uuid, groupChange: GROUP_CHANGE_STUB }));
  });

  it('remove() should dispatch action', () => {
    facade.remove(GROUP_STUB.uuid);

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.remove({ uuid: GROUP_STUB.uuid }));
  });

  it('sync() should dispatch action', () => {
    facade.sync(GROUPS_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(GroupActions.sync({ groups: GROUPS_STUB }));
  });
});
