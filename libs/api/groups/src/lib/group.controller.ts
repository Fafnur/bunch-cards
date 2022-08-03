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

import { formExceptionFactory } from '@bunch/api/forms';
import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { GroupDto } from '@bunch/groups/common';
import { UserJwtCredentials } from '@bunch/users/common';

import { GroupChangeForm, GroupCreateForm } from './group.form';
import { GroupService } from './group.service';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async create(@Request() req: { user: UserJwtCredentials }, @Body() form: GroupCreateForm): Promise<GroupDto> {
    return this.service.create({ ...form, owner: req.user.userId });
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
    @Body() form: GroupChangeForm
  ): Promise<GroupDto> {
    let group = (await this.service.findOne(params.uuid)) as GroupDto;
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }

    await this.service.update(params.uuid, { ...form, cards: undefined });
    group = (await this.service.findOne(params.uuid)) as GroupDto;

    return group;
  }

  @Get()
  async load(@Request() req: { user: UserJwtCredentials }): Promise<GroupDto[]> {
    return await this.service.find(req.user.userId);
  }

  @Get(':uuid')
  async loadGroup(@Request() req: { user: UserJwtCredentials }, @Param() params: { uuid: string }): Promise<GroupDto | null> {
    return await this.service.findOneWithCards(params.uuid, req.user.userId);
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: UserJwtCredentials }, @Param() params: { uuid: string }): Promise<void> {
    const group = await this.service.findOne(params.uuid);
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }

    return await this.service.delete(params.uuid);
  }
}
