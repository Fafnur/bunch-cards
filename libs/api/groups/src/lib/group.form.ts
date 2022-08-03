import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { GroupChange, GroupCreate } from '@bunch/groups/common';

export class GroupCreateForm implements GroupCreate {
  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(36, 36, {
    context: { errorCode: 'isLength' },
  })
  uuid!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @Length(1, 60, {
    context: { errorCode: 'isLength' },
  })
  name!: string;

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 256, {
    context: { errorCode: FormErrorType.IsLength },
  })
  @IsOptional()
  cover!: string;

  @IsInt({
    context: { errorCode: FormErrorType.IsInt },
  })
  @IsOptional()
  owner?: number;

  @IsInt({
    context: { errorCode: FormErrorType.IsInt },
  })
  @IsOptional()
  order?: number;

  @IsArray({
    context: { errorCode: FormErrorType.IsArray },
  })
  @IsOptional()
  orderCards?: string[];

  @IsArray({
    context: { errorCode: FormErrorType.IsArray },
  })
  @IsOptional()
  cards?: string[];
}

export class GroupChangeForm implements GroupChange {
  @Length(1, 60, {
    context: { errorCode: 'isLength' },
  })
  @IsOptional()
  name!: string;

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 256, {
    context: { errorCode: FormErrorType.IsLength },
  })
  @IsOptional()
  cover!: string;

  @IsInt({
    context: { errorCode: FormErrorType.IsInt },
  })
  @IsOptional()
  order?: number;

  @IsArray({
    context: { errorCode: FormErrorType.IsArray },
  })
  @IsOptional()
  orderCards?: string[];

  @IsArray({
    context: { errorCode: FormErrorType.IsArray },
  })
  @IsOptional()
  cards?: string[];
}
