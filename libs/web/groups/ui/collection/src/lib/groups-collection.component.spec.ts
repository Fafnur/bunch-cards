import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { Group, GROUPS_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { GroupCardModule } from '@bunch/web/groups/ui/card';
import { GridModule } from '@bunch/web/ui/grid';

import { GroupsCollectionComponent } from './groups-collection.component';
import { GroupsCollectionComponentPo } from './groups-collection.component.po';

describe('GroupsCollectionComponent', () => {
  let po: GroupsCollectionComponentPo;
  let fixture: ComponentFixture<GroupsCollectionComponent>;
  let groupFacadeMock: GroupFacade;
  let groups$: ReplaySubject<Group[]>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    groups$ = new ReplaySubject<Group[]>(1);

    when(groupFacadeMock.groups$).thenReturn(groups$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule, MockModule(GroupCardModule), MockModule(DragDropModule), MockModule(GridModule)],
      declarations: [GroupsCollectionComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsCollectionComponent);
    po = new GroupsCollectionComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    groups$.next(GROUPS_STUB);
    fixture.detectChanges();

    expect(po.columns.length).toBe(1);
    expect(po.drops.length).toBe(0);
  });
});
