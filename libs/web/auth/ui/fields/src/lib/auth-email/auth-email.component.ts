import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bunch-auth-email',
  templateUrl: './auth-email.component.html',
  styleUrls: ['./auth-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthEmailComponent {
  @Input() control!: FormControl<string>;
}
