import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateCommand } from '../impl/user-create.command';
import { UserService } from '../../user.service';
import { UserCreate } from '../../domain/user-create.domain';
import { User } from '../../domain/user.domain';
import { Inject } from '@nestjs/common';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
  @Inject()
  private readonly userService: UserService;

  async execute(command: UserCreateCommand): Promise<User> {
    const userCreate = UserCreate.fromCommand(command);
    return this.userService.create(userCreate);
  }
}
