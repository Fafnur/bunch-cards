import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class EditPageComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId('form');
  }
}
