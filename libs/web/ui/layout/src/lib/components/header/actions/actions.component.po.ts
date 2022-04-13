import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Support = 'support',
}

export class ActionsComponentPo extends PageObject {
  get support(): DebugElement | null {
    return this.getByAutomationId(Automation.Support);
  }
}
