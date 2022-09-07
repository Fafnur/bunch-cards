import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPageComponent {}
