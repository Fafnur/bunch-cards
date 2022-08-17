import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Firstname = 'firstname',
  Lastname = 'lastname',
  Password = 'password',
  Email = 'email',
  Error = 'error',
  Submit = 'submit',
}

export class RegisterFormComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get firstname(): DebugElement | null {
    return this.getByAutomationId(Automation.Firstname);
  }

  get lastname(): DebugElement | null {
    return this.getByAutomationId(Automation.Lastname);
  }

  get password(): DebugElement | null {
    return this.getByAutomationId(Automation.Password);
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
