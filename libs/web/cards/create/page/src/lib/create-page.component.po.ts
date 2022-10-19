import { PageObject } from '@bunch/core/testing';

export class CreatePageComponentPo extends PageObject {
  get form() {
    return this.getByAutomationId('form');
  }
}
