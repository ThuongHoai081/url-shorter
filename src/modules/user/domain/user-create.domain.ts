import { UserEntity } from '../entities/user.entity';

export class UserCreate {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  constructor(props: { firstName: string; lastName: string; email: string }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      firstName: userCreate.firstName,
      lastName: userCreate.lastName,
      email: userCreate.email,
    };
  }
}
