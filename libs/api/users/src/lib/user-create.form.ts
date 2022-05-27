import { IsEmail, IsNotEmpty, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { UserCreate } from '@bunch/users/common';

export class UserCreateForm implements UserCreate {
  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
  })
  @Length(1, 60, {
    context: { errorCode: 'isLength' },
  })
  firstname!: string;

  @IsNotEmpty({
    context: { errorCode: FormErrorType.IsNotEmpty },
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
  @Length(6, 60, {
    context: { errorCode: FormErrorType.IsLength },
  })
  password!: string;
}
