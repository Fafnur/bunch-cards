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

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async change(
    @Request() req: { user: UserJwtCredentials },
    @Param() params: { id: number },
    @Body() form: GroupChangeForm
  ): Promise<GroupDto> {
    let group = await this.service.findOne(+params.id);
    if (!group) {
      throw new BadRequestException(`Group #${params.id} not found`);
    }

    await this.service.update(+params.id, form);
    group = (await this.service.findOne(+params.id)) as GroupDto;

    return group;
  }

  @Get()
  async load(@Request() req: { user: UserJwtCredentials }): Promise<GroupDto[]> {
    return await this.service.find(req.user.userId);
  }

  @Get(':id')
  async loadGroup(@Request() req: { user: UserJwtCredentials }, @Param() params: { id: number }): Promise<GroupDto | null> {
    return await this.service.findOneWithCards(+params.id, req.user.userId);
  }

  @Delete(':id')
  async delete(@Request() req: { user: UserJwtCredentials }, @Param() params: { id: number }): Promise<void> {
    const group = await this.service.findOne(+params.id);
    if (!group) {
      throw new BadRequestException(`Group #${params.id} not found`);
    }

    return await this.service.delete(+params.id);
  }
}
