import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserGetQuery } from './queries/impl/user-get.query';
import { UserCreateCommand } from './commands/impl/user-create.command';
import { UsersGetAllQuery } from './queries/impl/users-get-all.query';
import { UserUpdateCommand } from './commands/impl/user-update.command';
import { UserRemoveCommand } from './commands/impl/user-remove.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    const command = UserCreateCommand.fromDto(createUserDto);

    return UserDto.fromDomain(await this.commandBus.execute(command));
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromDomains(
      await this.queryBus.execute(new UsersGetAllQuery()),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const query = UserGetQuery.create(id);

    return UserDto.fromDomain(await this.queryBus.execute(query));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserDto> {
    const command = UserUpdateCommand.fromDto(id, updateUserDto);

    return UserDto.fromDomain(await this.commandBus.execute(command));
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const command = UserRemoveCommand.create(id);

    await this.commandBus.execute(command);
  }
}
