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
import { AuthJwtCredentials } from '@bunch/auth/common';
import { GroupDto } from '@bunch/groups/common';

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
  async create(@Request() req: { user: AuthJwtCredentials }, @Body() form: GroupCreateForm): Promise<GroupDto> {
    return this.service.create({ ...form, owner: req.user.uuid });
  }

  @Patch(':uuid')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async change(
    @Request() req: { user: AuthJwtCredentials },
    @Param() params: { uuid: string },
    @Body() form: GroupChangeForm
  ): Promise<GroupDto> {
    const group = (await this.service.findOne(params.uuid)) as GroupDto;
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cards, ...other } = form;

    return this.service.save({ ...group, ...other, orderCards: other.orderCards ?? cards ?? [] });
  }

  @Get()
  async load(@Request() req: { user: AuthJwtCredentials }): Promise<GroupDto[]> {
    return this.service.find(req.user.uuid);
  }

  @Get(':uuid')
  async loadGroup(@Request() req: { user: AuthJwtCredentials }, @Param() params: { uuid: string }): Promise<GroupDto | null> {
    return this.service.findOneWithCards(params.uuid, req.user.uuid);
  }

  @Delete(':uuid')
  async delete(@Request() req: { user: AuthJwtCredentials }, @Param() params: { uuid: string }): Promise<void> {
    const group = await this.service.findOne(params.uuid);
    if (!group) {
      throw new BadRequestException(`Group #${params.uuid} not found`);
    }

    return this.service.delete(params.uuid);
  }

  @Put()
  async sync(@Request() req: { user: AuthJwtCredentials }, @Body() groups: GroupDto[]): Promise<GroupDto[]> {
    return this.service.sync(req.user.uuid, groups);
  }
}
