import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Title = 'title',
  Reset = 'reset',
  Links = 'links',
}

export class LoginPageComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get title(): DebugElement | null {
    return this.getByAutomationId(Automation.Title);
  }

  get reset(): DebugElement | null {
    return this.getByAutomationId(Automation.Reset);
  }

  get links(): DebugElement | null {
    return this.getByAutomationId(Automation.Links);
  }
}
