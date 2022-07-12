import { IsNotEmpty, IsString, Length } from 'class-validator';

import { FormErrorType } from '@bunch/api/forms';
import { CardCreate } from '@bunch/cards/common';

export class CardCreateForm implements CardCreate {
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

  @IsString({
    context: { errorCode: FormErrorType.IsString },
  })
  @Length(1, 256, {
    context: { errorCode: FormErrorType.IsLength },
  })
  cover!: string;

  // @IsArray({
  //   context: { errorCode: FormErrorType.IsArray },
  // })
  // images!: string[];
}
