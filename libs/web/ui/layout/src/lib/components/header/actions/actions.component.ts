import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {}
