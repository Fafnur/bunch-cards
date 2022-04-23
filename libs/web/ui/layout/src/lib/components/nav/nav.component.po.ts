import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  NavLink = 'nav-link',
}

export class NavComponentPo extends PageObject {
  get navLinks(): DebugElement[] {
    return this.getAllByAutomationId(Automation.NavLink);
  }
}
