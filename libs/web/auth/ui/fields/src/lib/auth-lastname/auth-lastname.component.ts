import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-lastname',
  templateUrl: './auth-lastname.component.html',
  styleUrls: ['./auth-lastname.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLastnameComponent {
  @Input() control!: FormControl<string>;
}
