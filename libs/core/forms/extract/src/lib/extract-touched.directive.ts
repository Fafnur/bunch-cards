import { ChangeDetectorRef, Directive, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '@bunch/core/utils/destroy';
import { extractTouchedChanges } from '@bunch/core/utils/operators';

@Directive({
  selector: '[bunchExtractTouched],[bunch-extract-touched]',
  providers: [DestroyService],
})
export class ExtractTouchedDirective implements OnInit {
  @Input() control?: UntypedFormControl;
  @Input() children?: UntypedFormControl | UntypedFormControl[];

  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private readonly destroy$: DestroyService) {}

  ngOnInit(): void {
    if (this.control) {
      extractTouchedChanges(this.control)
        .pipe(
          tap(() => {
            this.changeDetectorRef.markForCheck();
            if (this.children) {
              if (Array.isArray(this.children)) {
                this.children.forEach((control) => control.markAsTouched());
              } else {
                this.children.markAsTouched();
              }
            }
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      console.warn('Control is not found on extract touched');
    }
  }
}
