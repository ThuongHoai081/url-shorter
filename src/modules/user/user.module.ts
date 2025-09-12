import { Module, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule {}
