import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-username',
  templateUrl: './auth-username.component.html',
  styleUrls: ['./auth-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthUsernameComponent {
  @Input() control!: FormControl<string>;
}
