import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginForm } from '../domain/login-form';
import _ from 'lodash';

export class LoginFormDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  public static toLoginForm(dto: LoginFormDto): LoginForm {
    return {
      email: _.toLower(dto.email),
      password: dto.password,
    };
  }
}
