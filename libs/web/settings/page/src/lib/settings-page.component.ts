import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
