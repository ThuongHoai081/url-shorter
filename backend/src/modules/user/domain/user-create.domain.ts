import { UserEntity } from '../entities/user.entity';

export class UserCreate {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      email: userCreate.email,
    };
  }
}
