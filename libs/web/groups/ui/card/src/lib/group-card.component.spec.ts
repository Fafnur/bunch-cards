import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { GROUP_STUB } from '@bunch/groups/common';

import { GroupCardComponent } from './group-card.component';

describe('GroupCardComponent', () => {
  let component: GroupCardComponent;
  let fixture: ComponentFixture<GroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule, RouterTestingModule, MockModule(MatCardModule), MockModule(MatDividerModule)],
      declarations: [GroupCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCardComponent);
    component = fixture.componentInstance;

    // TODO: Add pageObject
    component.group = GROUP_STUB;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
