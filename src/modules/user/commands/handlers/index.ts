import { UserCreateHandler } from './user-create.handler';
import { UserRemoveHandler } from './user-remove.handler';
import { UserUpdateHandler } from './user-update.handler';

export const CommandHandlers = [
  UserCreateHandler,
  UserRemoveHandler,
  UserUpdateHandler,
];
