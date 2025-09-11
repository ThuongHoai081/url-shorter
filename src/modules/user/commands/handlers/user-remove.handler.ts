import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRemoveCommand } from '../impl/user-remove.command';
import { UserService } from '../../user.service';
import { Inject } from '@nestjs/common';

@CommandHandler(UserRemoveCommand)
export class UserRemoveHandler implements ICommandHandler<UserRemoveCommand> {
  @Inject()
  private readonly userService: UserService;

  async execute(command: UserRemoveCommand): Promise<void> {
    return this.userService.remove(command.id);
  }
}
