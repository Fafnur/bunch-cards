import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-dictionary-layout',
  templateUrl: './dictionary-layout.component.html',
  styleUrls: ['./dictionary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryLayoutComponent {}
