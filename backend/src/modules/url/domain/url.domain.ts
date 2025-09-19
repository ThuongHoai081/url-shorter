import { UrlEntity } from '../entities/url.entity';

export class Url {
  readonly id: number;

  readonly originalUrl: string;

  readonly shortCode: string;

  readonly userId?: number;

  readonly domainId: number;

  readonly visitCount: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(entity: UrlEntity): Url {
    return {
      id: entity.id,
      originalUrl: entity.originalUrl,
      shortCode: entity.shortCode,
      userId: entity.userId ?? undefined,
      domainId: entity.domainId,
      visitCount: entity.visitCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: UrlEntity[]): Url[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
