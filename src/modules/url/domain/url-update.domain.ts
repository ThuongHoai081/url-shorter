import { UrlEntity } from '../entities/url.entity';

export class UrlUpdate {
  readonly originalUrl?: string;

  readonly shortCode?: string;

  readonly userId?: number;

  static toEntity(urlUpdate: UrlUpdate): Partial<UrlEntity> {
    return {
      originalUrl: urlUpdate.originalUrl,
      shortCode: urlUpdate.shortCode,
      userId: urlUpdate.userId,
    };
  }
}
