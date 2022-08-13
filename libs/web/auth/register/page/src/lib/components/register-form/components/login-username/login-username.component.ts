import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-login-username',
  templateUrl: './login-username.component.html',
  styleUrls: ['./login-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginUsernameComponent {
  @Input() control!: FormControl<string>;
}
