import { UserCreateDto } from '../../dto/user-create.dto';

export class UserCreateCommand {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  private constructor(props: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }

  static fromDto(dto: UserCreateDto) {
    return new UserCreateCommand({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });
  }
}
