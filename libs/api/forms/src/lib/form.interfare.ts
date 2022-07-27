export enum FormErrorType {
  // Server
  IsNotValid = 'isNotValid',
  IsNotEmpty = 'isNotEmpty',
  IsLength = 'isLength',
  IsBoolean = 'isBoolean',
  IsDateString = 'isDateString',
  IsEmail = 'isEmail',
  IsEnum = 'isEnum',
  IsOptional = 'isOptional',
  IsSpell = 'isSpell',
  IsMin = 'isMin',
  IsMax = 'isMax',
  IsInt = 'isInt',
  IsString = 'isString',
  IsArray = 'isArray',
  IsObject = 'isObject',

  // Server unknown
  IsServer = 'isServer',

  // Front
  Required = 'required',
  RequiredTrue = 'requiredTrue',
  MinLength = 'minlength',
  MaxLength = 'maxlength',
  Min = 'min',
  Max = 'max',
  Email = 'email',
}
