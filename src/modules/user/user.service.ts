import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreate } from './domain/user-create.domain';
import { User } from './domain/user.domain';
import { UserUpdate } from './domain/user-update.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userCreate: UserCreate): Promise<User> {
    await this.verifyEmailIsNotExisting(userCreate.email);

    const userEntity = this.userRepository.create(
      UserCreate.toEntity(userCreate),
    );

    const saveUser = await this.userRepository.save(userEntity);

    return User.fromEntity(saveUser);
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find();

    return User.fromEntities(userEntities);
  }

  async findById(id: number): Promise<User> {
    const userEntity = await this.findUserOrThrow(id);

    return User.fromEntity(userEntity);
  }

  async update(id: number, userUpdate: UserUpdate): Promise<User> {
    const userEntity = await this.findUserOrThrow(id);

    return User.fromEntity(
      await this.userRepository.save({
        ...userEntity,
        ...UserUpdate.toEntity(userUpdate),
      }),
    );
  }

  async remove(id: number): Promise<void> {
    const userEntity = await this.findUserOrThrow(id);

    await this.userRepository.remove(userEntity);
  }

  private async verifyEmailIsNotExisting(email: string): Promise<void> {
    const exists = await this.userRepository.findOneBy({ email });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }
  }

  private async findUserOrThrow(id: number): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userEntity;
  }

  async getTopUser(limit: number): Promise<User[]> {
    const { entities } = await this.baseTopUserQuery(limit)
      .orderBy('COUNT(url.id)', 'DESC')
      .getRawAndEntities();

    return User.fromEntities(entities);
  }

  private baseTopUserQuery(limit: number | undefined) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.urls', 'url')
      .groupBy('user.id')
      .limit(limit);
  }
}
