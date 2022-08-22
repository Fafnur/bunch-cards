import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';

@Component({
  selector: 'bunch-email-confirm-page',
  templateUrl: './email-confirm-page.component.html',
  styleUrls: ['./email-confirm-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class EmailConfirmPageComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly authFacade: AuthFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    const { token } = this.route.snapshot.queryParams;

    if (token) {
      this.authFacade.confirmEmailSuccess$
        .pipe(
          tap(() => {
            void this.navigationService.navigateByUrl(this.navigationService.getPaths().dashboard);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();

      this.authFacade.confirmEmailFailure$
        .pipe(
          tap(() => {
            void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();

      this.authFacade.confirmEmail(token);
    } else {
      void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
    }
  }
}
