import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'bunch-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPasswordComponent {
  @Input() control!: UntypedFormControl;
}
