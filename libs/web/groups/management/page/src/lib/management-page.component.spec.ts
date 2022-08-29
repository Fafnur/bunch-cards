import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { SpinnerModule } from '@bunch/web/ui/spinner';

import { ManagementPageComponent } from './management-page.component';

describe('ManagementPageComponent', () => {
  let component: ManagementPageComponent;
  let fixture: ComponentFixture<ManagementPageComponent>;
  let groupFacadeMock: GroupFacade;
  let groups$: ReplaySubject<Group[]>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    groups$ = new ReplaySubject<Group[]>(1);

    when(groupFacadeMock.groups$).thenReturn(groups$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(SpinnerModule)],
      declarations: [ManagementPageComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
