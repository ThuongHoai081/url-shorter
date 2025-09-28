import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginForm } from '../domain/login-form';
import _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class LoginFormDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
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
