import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Field = 'field',
  Label = 'label',
  Control = 'control',
  Error = 'error',
  ErrorRequired = 'error-required',
}

export class LoginUsernameComponentPo extends PageObject {
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

  get errorRequired(): DebugElement | null {
    return this.getByAutomationId(Automation.ErrorRequired);
  }
}
