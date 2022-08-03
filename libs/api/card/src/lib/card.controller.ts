import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { CardDto } from '@bunch/cards/common';
import { UserJwtCredentials } from '@bunch/users/common';

import { CardChangeForm, CardCreateForm } from './card.form';
import { CardService } from './card.service';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly service: CardService) {}

  @Get()
  async load(@Request() req: { user: UserJwtCredentials }): Promise<CardDto[]> {
    return await this.service.find(req.user.userId);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: CardCreateForm): Promise<CardDto> {
    return await this.service.create({ ...form, owner: req.user.userId });
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
  ): Promise<CardDto> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    return await this.service.save({ ...card, ...form });
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: UserJwtCredentials }, @Param() params: { uuid: string }): Promise<void> {
    const card = await this.service.findOne(params.uuid);
    if (!card) {
      throw new BadRequestException(`Card #${params.uuid} not found`);
    }

    return await this.service.delete(params.uuid);
  }

  @Put()
  async sync(@Request() req: { user: UserJwtCredentials }, @Body() groups: CardDto[]): Promise<CardDto[]> {
    return await this.service.sync(req.user.userId, groups);
  }
}
