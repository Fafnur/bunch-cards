import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GroupActions from './group.actions';
import { GroupEffects } from './group.effects';

describe('GroupEffects', () => {
  let actions: Observable<Action>;
  let effects: GroupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [GroupEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(GroupEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GroupActions.initGroup() });

      const expected = hot('-a-|', { a: GroupActions.loadOneSuccess({ group: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
