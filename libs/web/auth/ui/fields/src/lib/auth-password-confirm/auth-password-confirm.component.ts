import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-password-confirm',
  templateUrl: './auth-password-confirm.component.html',
  styleUrls: ['./auth-password-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPasswordConfirmComponent {
  @Input() control!: FormControl<string>;
}
