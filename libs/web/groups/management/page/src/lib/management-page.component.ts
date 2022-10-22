import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-groups-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPageComponent {}
