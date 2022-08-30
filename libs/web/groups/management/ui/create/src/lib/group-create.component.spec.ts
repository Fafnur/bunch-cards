import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateComponent } from './group-create.component';

describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
