import { UserUpdateDto } from '../../dto/user-update.dto';

export class UserUpdateCommand {
  readonly id: number;

  readonly firstName?: string;

  readonly lastName?: string;

  readonly email?: string;

  private constructor(props: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }

  static fromDto(id: number, dto: UserUpdateDto): UserUpdateCommand {
    return new UserUpdateCommand({ id, ...dto });
  }
}
