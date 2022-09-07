import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-card-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {}
