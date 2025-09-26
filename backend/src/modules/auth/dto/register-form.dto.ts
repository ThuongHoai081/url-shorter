import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterForm } from '../domain/register-form';
import _ from 'lodash';

export class RegisterFormDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

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
