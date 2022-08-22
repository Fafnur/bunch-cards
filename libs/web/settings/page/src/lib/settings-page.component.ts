import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.authFacade.logoutSuccess$
      .pipe(
        tap(() => {
          void this.router.navigate(this.navigationService.getRoute(this.navigationService.getPaths().authLogin));
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onLogout(): void {
    this.authFacade.logout();
  }
}
