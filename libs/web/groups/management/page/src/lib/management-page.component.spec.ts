import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { GroupCreateModule } from '@bunch/web/groups/management/ui/create';
import { GroupsCollectionModule } from '@bunch/web/groups/ui/collection';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageComponentPo } from './management-page.component.po';

describe('ManagementPageComponent', () => {
  let po: ManagementPageComponentPo;
  let fixture: ComponentFixture<ManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(GroupsCollectionModule), MockModule(GroupCreateModule)],
      declarations: [ManagementPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementPageComponent);
    po = new ManagementPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.create).toBeTruthy();
    expect(po.collection).toBeTruthy();
  });
});
