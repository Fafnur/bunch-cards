import { Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { DestroyService } from '@bunch/core/utils/destroy';
import { LayoutService } from '@bunch/web/core/layout';

@Component({
  selector: 'bunch-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SpinnerComponent implements OnInit {
  @Input() mobileInvertColor = false;
  color: 'primary' | 'accent' = 'primary';

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
    private readonly layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    if (this.mobileInvertColor) {
      this.layoutService.layoutType$
        .pipe(
          tap((result) => {
            this.color = result === Breakpoints.Handset ? 'accent' : 'primary';
            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
}
