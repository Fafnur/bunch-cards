import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { UserJwtCredentials } from '@bunch/users/common';

import { CardEntity } from './card.entity';
import { CardService } from './card.service';
import { CardCreateForm } from './card-create.form';

@Controller('cards')
@UseGuards(JwtAuthGuard)
@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: CardCreateForm): Promise<CardEntity> {
    return this.cardService.create({ ...form, owner: req.user.userId });
  }
}
