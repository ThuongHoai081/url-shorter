import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterForm } from '../domain/register-form';
import _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class RegisterFormDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  public static toRegisterForm(_this: RegisterFormDto): RegisterForm {
    return {
      firstName: _this.firstName,
      lastName: _this.lastName,
      email: _.toLower(_this.email),
      password: _this.password,
    };
  }
}
