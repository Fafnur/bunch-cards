import { Controller } from '@nestjs/common';

import { CardGroupService } from './card-group.service';

@Controller()
export class CardGroupController {
  constructor(private readonly cardGroupService: CardGroupService) {}
}
