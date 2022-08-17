import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-firstname',
  templateUrl: './auth-firstname.component.html',
  styleUrls: ['./auth-firstname.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFirstnameComponent {
  @Input() control!: FormControl<string>;
}
