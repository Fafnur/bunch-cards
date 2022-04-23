import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bunch-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryPageComponent {}
