import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { RequireLoggedIn } from 'src/guards/role-container';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return UserDto.fromDomains(await this.userService.findAll());
  }

  @Get('top-shorter')
  async getTopShorter(): Promise<UserDto[]> {
    return UserDto.fromDomains(await this.userService.getTopShorter(10));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return UserDto.fromDomain(await this.userService.findById(id));
  }

  @Patch('me')
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async update(
    @AuthUser() user: UserEntity,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserDto> {
    return UserDto.fromDomain(
      await this.userService.update(
        user,
        UserUpdateDto.toUserUpdate(userUpdateDto),
      ),
    );
  }

  @Delete(':id')
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async remove(@AuthUser() user: UserEntity): Promise<void> {
    await this.userService.remove(user);
  }
}
