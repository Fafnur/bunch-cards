import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';

import { GroupCreateComponent } from './group-create.component';

describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NoopAnimationsModule, MockModule(NavigationPipesModule), MockModule(MatCardModule)],
      declarations: [GroupCreateComponent],
      providers: [PATHS_STUB],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
