import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class EmailConfirmPageComponentPo extends PageObject {
  get spinner(): DebugElement | null {
    return this.getByAutomationId('spinner');
  }
}
