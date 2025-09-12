import { UrlEntity } from '../entities/url.entity';

export class UrlCreate {
  readonly originalUrl: string;

  readonly shortCode: string;

  readonly userId?: number;

  readonly domainId: number;

  readonly visitCount: number;

  static toEntity(urlCreate: UrlCreate): Partial<UrlEntity> {
    return {
      originalUrl: urlCreate.originalUrl,
      shortCode: urlCreate.shortCode,
      userId: urlCreate.userId ?? null,
      domainId: urlCreate.domainId,
      visitCount: urlCreate.visitCount ?? 0,
    };
  }
}
