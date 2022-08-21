import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Password = 'password',
  PasswordConfirm = 'password-confirm',
  Error = 'error',
  Submit = 'submit',
}

export class PasswordChangeFormComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get password(): DebugElement | null {
    return this.getByAutomationId(Automation.Password);
  }

  get passwordConfirm(): DebugElement | null {
    return this.getByAutomationId(Automation.PasswordConfirm);
  }

  get error(): DebugElement | null {
    return this.getByAutomationId(Automation.Error);
  }

  get submit(): DebugElement | null {
    return this.getByAutomationId(Automation.Submit);
  }
}
