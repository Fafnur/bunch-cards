import { MatDialog } from '@angular/material/dialog';
import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { AUTH_REGISTER_STUB } from '@bunch/auth/common';

import { RegisterNotifyComponent } from './register-notify.component';
import { RegisterNotifyService } from './register-notify.service';

describe('RegisterNotifyService', () => {
  let service: RegisterNotifyService;
  let matDialogMock: MatDialog;

  beforeEach(() => {
    matDialogMock = mock(MatDialog);

    service = new RegisterNotifyService(instance(matDialogMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be show', () => {
    const expected = hot('a', { a: true });

    when(matDialogMock.open(RegisterNotifyComponent, deepEqual({ data: AUTH_REGISTER_STUB, disableClose: true })).afterClosed()).thenReturn(
      expected
    );

    expect(service.open(AUTH_REGISTER_STUB)).toBeObservable(expected);
  });
});
