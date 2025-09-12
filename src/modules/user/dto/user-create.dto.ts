import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserCreate } from '../domain/user-create.domain';

export class UserCreateDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  readonly lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  static toUserCreate(userCreateDto: UserCreateDto): UserCreate {
    return {
      firstName: userCreateDto.firstName,
      lastName: userCreateDto.lastName,
      email: userCreateDto.email,
    };
  }
}
