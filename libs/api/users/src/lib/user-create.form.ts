import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { UserCreate } from '@bunch/users/common';

export class UserCreateForm implements UserCreate {
  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 60, {
    context: { errorCode: 'isLength' },
  })
  firstname!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 60, {
    context: { errorCode: FormErrorType.IsLength },
  })
  lastname!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsEmail(undefined, {
    context: { errorCode: FormErrorType.IsEmail },
  })
  email!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(6, 60, {
    context: { errorCode: FormErrorType.IsLength },
  })
  password!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(36, 36, {
    context: { errorCode: FormErrorType.IsLength },
  })
  uuid!: string;
}
