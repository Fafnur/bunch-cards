import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Username = 'username',
  Password = 'password',
  Error = 'error',
  Submit = 'submit',
}

export class LoginFormComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get username(): DebugElement | null {
    return this.getByAutomationId(Automation.Username);
  }

  get password(): DebugElement | null {
    return this.getByAutomationId(Automation.Password);
  }

  get error(): DebugElement | null {
    return this.getByAutomationId(Automation.Error);
  }
  get submit(): DebugElement | null {
    return this.getByAutomationId(Automation.Submit);
  }
}
