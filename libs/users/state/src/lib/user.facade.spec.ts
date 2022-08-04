import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { HTTP_ERROR_STUB } from '@bunch/core/api';
import { USER_CHANGE_STUB, USER_STUB } from '@bunch/users/common';

import * as UserActions from './user.actions';
import { UserFacade } from './user.facade';
import { initialUserState, USER_FEATURE_KEY } from './user.reducer';
import { selectUser } from './user.selectors';

describe('User Facade', () => {
  let facade: UserFacade;
  let actions: Observable<unknown>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserFacade,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: { [USER_FEATURE_KEY]: initialUserState },
          selectors: [{ selector: selectUser, value: USER_STUB }],
        }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    facade = TestBed.inject(UserFacade);

    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should return user$', () => {
    const expected = hot('a', { a: USER_STUB });

    expect(facade.user$).toBeObservable(expected);
  });

  it('load() should dispatch action', () => {
    facade.load();

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.load());
  });

  it('load() should dispatch action', () => {
    facade.change(USER_CHANGE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.change({ userChange: USER_CHANGE_STUB }));
  });

  it('should emit loadSuccess$', () => {
    const action = UserActions.loadSuccess({ user: USER_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: USER_STUB });

    expect(facade.loadSuccess$).toBeObservable(expected);
  });

  it('should emit loadFailure$', () => {
    const action = UserActions.loadFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loadFailure$).toBeObservable(expected);
  });

  it('should emit changeSuccess$', () => {
    const action = UserActions.changeSuccess({ user: USER_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: USER_STUB });

    expect(facade.changeSuccess$).toBeObservable(expected);
  });

  it('should emit changeFailure$', () => {
    const action = UserActions.changeFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.changeFailure$).toBeObservable(expected);
  });
});
