import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { GroupChange, GroupCreate } from '@bunch/groups/common';

export class GroupCreateForm implements GroupCreate {
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
}
