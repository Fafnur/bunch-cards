import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';

import { AuthResetComponent } from './auth-reset.component';
import { AuthResetComponentPo } from './auth-reset.component.po';

describe('AuthResetComponent', () => {
  let pageObject: AuthResetComponentPo;
  let fixture: ComponentFixture<AuthResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(NavigationPipesModule)],
      declarations: [AuthResetComponent],
      providers: [PATHS_STUB],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthResetComponent);
    pageObject = new AuthResetComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.link).toBeTruthy();
  });
});
