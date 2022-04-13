import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Nav = 'nav',
}

export class MenuComponentPo extends PageObject {
  get nav(): DebugElement | null {
    return this.getByAutomationId(Automation.Nav);
  }
}
