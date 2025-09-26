import { RoleType } from 'src/guards/role-type';
import { UserEntity } from '../entities/user.entity';

export class User {
  readonly id: number;

  readonly role?: RoleType;

  readonly keyCloakId?: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(entity: UserEntity): User {
    return {
      id: entity.id,
      role: entity.role,
      keyCloakId: entity.keyCloakId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: UserEntity[]): User[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
