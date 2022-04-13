import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum ColumnAutomation {
  Web = 'web',
  Tablet = 'tablet',
  Handset = 'handset',
}

export class MultiplatformComponentPo extends PageObject {
  get web(): DebugElement | null {
    return this.getByAutomationId(ColumnAutomation.Web);
  }

  get tablet(): DebugElement | null {
    return this.getByAutomationId(ColumnAutomation.Tablet);
  }

  get handset(): DebugElement | null {
    return this.getByAutomationId(ColumnAutomation.Handset);
  }
}
