import { UserEntity } from '../entities/user.entity';

export class UserUpdate {
  readonly firstName?: string;

  readonly lastName?: string;

  readonly email?: string;

  static toEntity(userUpdate: UserUpdate): Partial<UserEntity> {
    return {
      firstName: userUpdate.firstName,
      lastName: userUpdate.lastName,
      email: userUpdate.email,
    };
  }
}
