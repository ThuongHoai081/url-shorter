import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdateCommand } from '../impl/user-update.command';
import { UserService } from '../../user.service';
import { UserUpdate } from '../../domain/user-update.domain';
import { User } from '../../domain/user.domain';
import { Inject } from '@nestjs/common';

@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
  @Inject()
  private readonly userService: UserService;

  async execute(command: UserUpdateCommand): Promise<User> {
    const userUpdate = UserUpdate.fromCommand(command);
    return this.userService.update(command.id, userUpdate);
  }
}
