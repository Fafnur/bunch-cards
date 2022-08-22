import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Spinner = 'spinner',
}

export class SpinnerComponentPo extends PageObject {
  get spinner(): DebugElement | null {
    return this.getByAutomationId(Automation.Spinner);
  }
}
