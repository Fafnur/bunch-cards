import { PageObject } from '@bunch/core/testing';

export class CardsFormComponentPo extends PageObject {
  get table() {
    return this.getByAutomationId('table');
  }

  // get actionsHeader() {
  //   return this.getByAutomationId('actions-header');
  // }
  //
  // get actions() {
  //   return this.getAllByAutomationId('actions');
  // }
  //
  // get groupHeader() {
  //   return this.getByAutomationId('group-header');
  // }
  //
  // get group() {
  //   return this.getAllByAutomationId('group');
  // }
  //
  // get originalHeader() {
  //   return this.getByAutomationId('original-header');
  // }
  //
  // get original() {
  //   return this.getAllByAutomationId('original');
  // }
  //
  // get translationHeader() {
  //   return this.getByAutomationId('translation-header');
  // }
  //
  // get translation() {
  //   return this.getAllByAutomationId('translation');
  // }
  //
  // get cancelGroup() {
  //   return this.getByAutomationId('cancel-group');
  // }
  //
  // get cancelCards() {
  //   return this.getByAutomationId('cancel-cards');
  // }
  //
  // get addGroup() {
  //   return this.getByAutomationId('add-group');
  // }
  //
  // get addCards() {
  //   return this.getByAutomationId('add-cards');
  // }
  //
  // get edit() {
  //   return this.getByAutomationId('edit');
  // }
}
