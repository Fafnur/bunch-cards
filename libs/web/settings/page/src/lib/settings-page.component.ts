import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';

@Component({
  selector: 'bunch-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SettingsPageComponent implements OnInit {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly navigationService: NavigationService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.authFacade.logoutSuccess$
      .pipe(
        tap(() => {
          void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onLogout(): void {
    this.authFacade.logout();
  }
}
