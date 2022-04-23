import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bunch-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
