import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page } from '@nativescript/core';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly page: Page) {
    this.page.actionBarHidden = true;
  }
}
