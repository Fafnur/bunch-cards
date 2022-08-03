import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { CardChange, CardCreate } from '@bunch/cards/common';

export class CardCreateForm implements CardCreate {
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
  original!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @Length(1, 60, {
    context: { errorCode: FormErrorType.IsLength },
  })
  translation!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(36, 36, {
    context: { errorCode: 'isLength' },
  })
  groupUuid!: string;

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 256, {
    context: { errorCode: FormErrorType.IsLength },
  })
  @IsOptional()
  cover?: string;

  @IsInt({
    context: { errorCode: FormErrorType.IsInt },
  })
  @IsOptional()
  owner?: number;
}

export class CardChangeForm implements CardChange {
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(36, 36, {
    context: { errorCode: 'isLength' },
  })
  @IsOptional()
  uuid?: string;

  @Length(1, 60, {
    context: { errorCode: 'isLength' },
  })
  @IsOptional()
  original?: string;

  @Length(1, 60, {
    context: { errorCode: FormErrorType.IsLength },
  })
  @IsOptional()
  translation?: string;

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(36, 36, {
    context: { errorCode: 'isLength' },
  })
  @IsOptional()
  groupUuid?: string;

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 256, {
    context: { errorCode: FormErrorType.IsLength },
  })
  @IsOptional()
  cover?: string;
}
