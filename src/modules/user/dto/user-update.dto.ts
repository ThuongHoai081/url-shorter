import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserUpdate } from '../domain/user-update.domain';

export class UserUpdateDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email?: string;

  static toUserUpdate(userUpdateDto: UserUpdateDto): UserUpdate {
    return {
      firstName: userUpdateDto.firstName,
      lastName: userUpdateDto.lastName,
      email: userUpdateDto.email,
    };
  }
}
