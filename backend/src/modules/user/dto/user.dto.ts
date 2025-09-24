import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../domain/user.domain';

export class UserDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  readonly id: number;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  readonly lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  readonly email: string;

  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  readonly username: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'Password of the user',
  })
  readonly password: string;

  @ApiPropertyOptional({
    example: '2025-09-10T12:00:00Z',
    description: 'Date when the user was created',
  })
  readonly createdAt?: Date;

  @ApiPropertyOptional({
    example: '2025-09-10T12:00:00Z',
    description: 'Date when the user was last updated',
  })
  readonly updatedAt?: Date;

  static fromDomain(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static fromDomains(users: User[]): UserDto[] {
    return users.map((user) => this.fromDomain(user));
  }
}
