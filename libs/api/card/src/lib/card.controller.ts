import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { Card } from '@bunch/cards/common';
import { UserJwtCredentials } from '@bunch/users/common';

import { CardEntity } from './card.entity';
import { CardEvents } from './card.event';
import { CardChangeForm, CardCreateForm } from './card.form';
import { CardService } from './card.service';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly service: CardService, private readonly eventEmitter: EventEmitter2) {}

  @Get()
  async load(@Request() req: { user: UserJwtCredentials }): Promise<Card[]> {
    return await this.service.find(req.user.userId);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: CardCreateForm): Promise<CardEntity> {
    const card = await this.service.create({ ...form, owner: req.user.userId });

    this.eventEmitter.emit(CardEvents.Created, { card, payload: form });

    return card;
  }

  @Patch(':uuid')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async change(
    @Request() req: { user: UserJwtCredentials },
    @Param() params: { uuid: string },
    @Body() form: CardChangeForm
  ): Promise<CardEntity> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    await this.service.update(params.uuid, form);

    return (await this.service.findOne(params.uuid)) as CardEntity;
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: UserJwtCredentials }, @Param() params: { uuid: string }): Promise<void> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    return await this.service.delete(params.uuid);
  }
}
