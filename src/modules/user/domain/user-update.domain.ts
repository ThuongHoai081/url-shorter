import { UserUpdateCommand } from '../commands/impl/user-update.command';
import { UserEntity } from '../entities/user.entity';

export class UserUpdate {
  readonly firstName?: string;

  readonly lastName?: string;

  readonly email?: string;

  constructor(props: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }

  static toEntity(userUpdate: UserUpdate): Partial<UserEntity> {
    const entity: Partial<UserEntity> = { updatedAt: new Date() };

    if (userUpdate.firstName !== undefined)
      entity.firstName = userUpdate.firstName;

    if (userUpdate.lastName !== undefined)
      entity.lastName = userUpdate.lastName;

    if (userUpdate.email !== undefined) entity.email = userUpdate.email;

    return entity;
  }

  static fromCommand(command: UserUpdateCommand): UserUpdate {
    return new UserUpdate({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
    });
  }
}
