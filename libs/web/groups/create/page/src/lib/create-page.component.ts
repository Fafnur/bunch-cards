import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {}
