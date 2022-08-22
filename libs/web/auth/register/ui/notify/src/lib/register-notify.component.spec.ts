import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';

import { AUTH_REGISTER_STUB } from '@bunch/auth/common';

import { RegisterNotifyComponent } from './register-notify.component';
import { RegisterNotifyComponentPo } from './register-notify.component.po';

describe('RegisterNotifyComponent', () => {
  let pageObject: RegisterNotifyComponentPo;
  let fixture: ComponentFixture<RegisterNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule, MockModule(MatDialogModule), MockModule(MatButtonModule)],
      declarations: [RegisterNotifyComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: AUTH_REGISTER_STUB,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterNotifyComponent);
    pageObject = new RegisterNotifyComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.title).toBeTruthy();
    expect(pageObject.content).toBeTruthy();
    expect(pageObject.close).toBeTruthy();
  });
});
