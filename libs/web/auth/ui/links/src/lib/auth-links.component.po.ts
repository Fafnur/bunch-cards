import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  SignIn = 'signin',
  SignUp = 'signup',
  Google = 'google',
  Apple = 'apple',
}

export class AuthLinksComponentPo extends PageObject<{ mode: 'signin' | 'signup' }> {
  get signin(): DebugElement | null {
    return this.getByAutomationId(Automation.SignIn);
  }

  get signup(): DebugElement | null {
    return this.getByAutomationId(Automation.SignUp);
  }

  get google(): DebugElement | null {
    return this.getByAutomationId(Automation.Google);
  }

  get apple(): DebugElement | null {
    return this.getByAutomationId(Automation.Apple);
  }

  setMode(mode: 'signin' | 'signup'): void {
    this.fixture.componentInstance.mode = mode;
  }
}
