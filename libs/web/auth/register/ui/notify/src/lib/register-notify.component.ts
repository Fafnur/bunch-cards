import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthRegister } from '@bunch/auth/common';

@Component({
  selector: 'bunch-register-notify',
  templateUrl: './register-notify.component.html',
  styleUrls: ['./register-notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterNotifyComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly register: AuthRegister) {}
}
