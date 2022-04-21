import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bunch-dictionary-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPageComponent {}
