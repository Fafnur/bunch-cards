import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Container = 'container',
  Logo = 'logo',
  Nav = 'nav',
}

export class HeaderComponentPo extends PageObject {
  get container(): DebugElement | null {
    return this.getByAutomationId(Automation.Container);
  }

  get logo(): DebugElement | null {
    return this.getByAutomationId(Automation.Logo);
  }

  get nav(): DebugElement | null {
    return this.getByAutomationId(Automation.Nav);
  }
}
