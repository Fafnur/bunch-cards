import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { UserJwtCredentials } from '@bunch/users/common';

import { CardGroupEntity } from './card-group.entity';
import { CardGroupService } from './card-group.service';
import { CardGroupCreateForm } from './card-group-create.form';

@Controller('card-groups')
@UseGuards(JwtAuthGuard)
export class CardGroupController {
  constructor(private readonly cardGroupService: CardGroupService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: CardGroupCreateForm): Promise<CardGroupEntity> {
    return this.cardGroupService.create({ ...form, owner: req.user.userId });
  }
}
