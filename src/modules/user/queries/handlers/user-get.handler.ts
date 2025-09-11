import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserGetQuery } from '../impl/user-get.query';
import { UserService } from '../../user.service';
import { User } from '../../domain/user.domain';
import { Inject } from '@nestjs/common';

@QueryHandler(UserGetQuery)
export class UserGetHandler implements IQueryHandler<UserGetQuery> {
  @Inject()
  private readonly userService: UserService;

  async execute(query: UserGetQuery): Promise<User> {
    return this.userService.findByID(query.id);
  }
}
