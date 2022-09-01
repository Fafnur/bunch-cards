import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavigationService } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {
  constructor(private readonly navigationService: NavigationService) {}

  onCreated(): void {
    void this.navigationService.navigateByUrl(this.navigationService.getPaths().groupsManagement);
  }
}
