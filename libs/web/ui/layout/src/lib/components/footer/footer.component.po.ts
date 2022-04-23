import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Container = 'container',
  Copyright = 'copyright',
}

export class FooterComponentPo extends PageObject {
  get container(): DebugElement | null {
    return this.getByAutomationId(Automation.Container);
  }

  get copyright(): DebugElement | null {
    return this.getByAutomationId(Automation.Copyright);
  }
}
