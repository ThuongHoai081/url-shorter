import { UserEntity } from '../entities/user.entity';

export class User {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly username: string;

  readonly password: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(entity: UserEntity): User {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      username: entity.username,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: UserEntity[]): User[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
