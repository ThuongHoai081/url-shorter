import { UserEntity } from '../../user/entities/user.entity';
import { RoleType } from '../../../guards/role-type';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly role: RoleType;

  public static fromUser(user: UserEntity): CurrentUserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
  }
}
