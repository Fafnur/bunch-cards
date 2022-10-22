import { PageObject } from '@bunch/core/testing';

export class GroupCardComponentPo extends PageObject {
  get card() {
    return this.getByAutomationId('card');
  }

  get title() {
    return this.getByAutomationId('title');
  }

  get subtitle() {
    return this.getByAutomationId('subtitle');
  }

  get divider() {
    return this.getByAutomationId('divider');
  }

  get actions() {
    return this.getByAutomationId('actions');
  }

  get view() {
    return this.getByAutomationId('view');
  }

  get create() {
    return this.getByAutomationId('create');
  }

  get editCards() {
    return this.getByAutomationId('edit-cards');
  }

  get edit() {
    return this.getByAutomationId('edit');
  }
}
