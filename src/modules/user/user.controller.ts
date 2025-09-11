import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.create(UserCreateDto.toUserCreate(createUserDto)),
    );
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromDomains(await this.userService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return UserDto.fromDomain(await this.userService.findByID(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.update(
        id,
        UserUpdateDto.toUserUpdate(updateUserDto),
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
