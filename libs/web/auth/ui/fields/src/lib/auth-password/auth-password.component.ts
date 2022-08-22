import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-password',
  templateUrl: './auth-password.component.html',
  styleUrls: ['./auth-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPasswordComponent {
  @Input() control!: FormControl<string>;
}
