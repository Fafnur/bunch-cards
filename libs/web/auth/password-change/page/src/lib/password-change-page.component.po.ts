import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Form = 'form',
  Title = 'title',
  Signin = 'signin',
  Links = 'links',
}

export class PasswordChangePageComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId(Automation.Form);
  }

  get title(): DebugElement | null {
    return this.getByAutomationId(Automation.Title);
  }

  get signin(): DebugElement | null {
    return this.getByAutomationId(Automation.Signin);
  }

  get links(): DebugElement | null {
    return this.getByAutomationId(Automation.Links);
  }
}
