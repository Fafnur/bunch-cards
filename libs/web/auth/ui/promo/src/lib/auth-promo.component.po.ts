import { PageObject } from '@bunch/core/testing';

enum Automation {
  Title = 'title',
  Description = 'description',
}

export class AuthPromoComponentPo extends PageObject {
  get title(): string | null {
    return this.text(Automation.Title);
  }
  get description(): string | null {
    return this.text(Automation.Description);
  }
}
