import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Title = 'title',
}

export class RegisterPageComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get title(): DebugElement | null {
    return this.getByAutomationId(Automation.Title);
  }
}
