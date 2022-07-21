import { Body, Controller, Get, Param, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CardCreateForm, CardEntity, CardService } from '@bunch/api/card';
import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { Card, CardGroup } from '@bunch/cards/common';
import { UserJwtCredentials } from '@bunch/users/common';

import { CardGroupEntity } from './card-group.entity';
import { CardGroupService } from './card-group.service';
import { CardGroupCreateForm } from './card-group-create.form';

@Controller()
@UseGuards(JwtAuthGuard)
export class CardGroupController {
  constructor(private readonly cardGroupService: CardGroupService, private readonly cardService: CardService) {}

  @Post('groups')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: CardGroupCreateForm): Promise<CardGroupEntity> {
    return this.cardGroupService.create({ ...form, owner: req.user.userId });
  }

  @Post('cards')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async createCard(@Request() req: { user: UserJwtCredentials }, @Body() form: CardCreateForm): Promise<CardEntity> {
    const card = await this.cardService.create({ ...form, owner: req.user.userId });

    if (form.group) {
      const group = await this.cardGroupService.findOneWithCards(form.group);
      if (group) {
        group.cards = [...(group.cards ?? []), card];
        await this.cardGroupService.save(group);
      }
    }

    return card;
  }

  @Get('cards')
  async loadCards(@Request() req: { user: UserJwtCredentials }): Promise<Card[]> {
    return await this.cardService.find(req.user.userId);
  }

  @Get('groups')
  async loadGroups(@Request() req: { user: UserJwtCredentials }): Promise<CardGroup[]> {
    return await this.cardGroupService.find(req.user.userId);
  }

  @Get('groups/:id')
  async loadGroup(@Request() req: { user: UserJwtCredentials }, @Param() params: { id: string }): Promise<CardGroup | null> {
    return await this.cardGroupService.findOneWithCards(+params.id, req.user.userId);
  }
}
