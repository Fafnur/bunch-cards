import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-reset-page',
  templateUrl: './password-change-page.component.html',
  styleUrls: ['./password-change-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangePageComponent implements OnInit {
  token!: string;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const { token } = this.route.snapshot.queryParams;
    if (token) {
      this.token = token ?? null;

      this.changeDetectorRef.markForCheck();
    } else {
      void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
    }
  }
}
