import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Field = 'field',
  Label = 'label',
  Control = 'control',
  Error = 'error',
}

export class LoginPasswordComponentPo extends PageObject {
  get field(): DebugElement | null {
    return this.getByAutomationId(Automation.Field);
  }

  get label(): DebugElement | null {
    return this.getByAutomationId(Automation.Label);
  }

  get control(): DebugElement | null {
    return this.getByAutomationId(Automation.Control);
  }

  get error(): DebugElement | null {
    return this.getByAutomationId(Automation.Error);
  }
}
