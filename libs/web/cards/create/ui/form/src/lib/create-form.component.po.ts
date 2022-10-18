import { PageObject } from '@bunch/core/testing';

export class CreateFormComponentPo extends PageObject {
  get form() {
    return this.getByAutomationId('form');
  }

  get groupLabel() {
    return this.getByAutomationId('group-label');
  }

  get groupControl() {
    return this.getByAutomationId('group-control');
  }

  get originalLabel() {
    return this.getByAutomationId('original-label');
  }

  get originalControl() {
    return this.getByAutomationId('original-control');
  }

  get translationLabel() {
    return this.getByAutomationId('translation-label');
  }

  get translationControl() {
    return this.getByAutomationId('translation-control');
  }

  get cancelGroup() {
    return this.getByAutomationId('cancel-group');
  }

  get cancelCards() {
    return this.getByAutomationId('cancel-cards');
  }

  get create() {
    return this.getByAutomationId('create');
  }
}
