import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersGetAllQuery } from '../impl/users-get-all.query';
import { UserService } from '../../user.service';
import { User } from '../../domain/user.domain';
import { Inject } from '@nestjs/common';

@QueryHandler(UsersGetAllQuery)
export class UsersGetAllHandler implements IQueryHandler<UsersGetAllQuery> {
  @Inject()
  private readonly userService: UserService;

  async execute(): Promise<User[]> {
    return this.userService.findAll();
  }
}
