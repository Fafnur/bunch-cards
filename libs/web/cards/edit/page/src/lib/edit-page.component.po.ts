import { PageObject } from '@bunch/core/testing';

export class EditPageComponentPo extends PageObject {
  get form() {
    return this.getByAutomationId('form');
  }
}
