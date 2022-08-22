import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthRegister } from '@bunch/auth/common';

import { RegisterNotifyComponent } from './register-notify.component';

@Injectable()
export class RegisterNotifyService {
  constructor(private readonly matDialog: MatDialog) {}

  open(data: AuthRegister): Observable<boolean> {
    return this.matDialog.open(RegisterNotifyComponent, { data, disableClose: true }).afterClosed();
  }
}
