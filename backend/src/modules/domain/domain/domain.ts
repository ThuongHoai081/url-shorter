import { DomainEntity } from '../entities/domain.entity';

export class Domain {
  readonly id: number;

  readonly name: string;

  readonly description?: string | null;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(entity: DomainEntity): Domain {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: DomainEntity[]): Domain[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
