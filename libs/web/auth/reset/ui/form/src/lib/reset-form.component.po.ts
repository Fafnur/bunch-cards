import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Email = 'email',
  Error = 'error',
  Submit = 'submit',
}

export class ResetFormComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get email(): DebugElement | null {
    return this.getByAutomationId(Automation.Email);
  }

  get error(): DebugElement | null {
    return this.getByAutomationId(Automation.Error);
  }

  get submit(): DebugElement | null {
    return this.getByAutomationId(Automation.Submit);
  }
}
