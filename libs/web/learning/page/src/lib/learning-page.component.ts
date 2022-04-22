import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPageComponent {}
