import { PageObject } from '@bunch/core/testing';

export class EditFormComponentPo extends PageObject {
  get form() {
    return this.getByAutomationId('form');
  }

  get nameLabel() {
    return this.getByAutomationId('name-label');
  }

  get nameControl() {
    return this.getByAutomationId('name-control');
  }

  get cancel() {
    return this.getByAutomationId('cancel');
  }

  get save() {
    return this.getByAutomationId('save');
  }
}
