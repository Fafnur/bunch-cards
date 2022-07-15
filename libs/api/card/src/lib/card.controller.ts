import { Controller, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@bunch/api/jwt/guards';

import { CardService } from './card.service';

@Controller('cards')
@UseGuards(JwtAuthGuard)
@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}
}
