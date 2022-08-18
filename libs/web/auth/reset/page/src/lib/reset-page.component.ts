import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPageComponent {}
