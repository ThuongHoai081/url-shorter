import { UserEntity } from '../entities/user.entity';

export class UserCreate {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly username: string;

  readonly password: string;

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      email: userCreate.email,
      username: userCreate.username,
      password: userCreate.password,
    };
  }
}
