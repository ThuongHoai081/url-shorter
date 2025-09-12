import { ApiProperty } from '@nestjs/swagger';
import { Url } from '../domain/url.domain';

export class UrlDto {
  @ApiProperty({ description: 'The unique ID of the URL' })
  readonly id: number;

  @ApiProperty({ description: 'The original URL' })
  readonly originalUrl: string;

  @ApiProperty({ description: 'The shortened code of the URL' })
  readonly shortCode: string;

  @ApiProperty({
    description: 'The ID of the user who created the URL',
    required: false,
    nullable: true,
  })
  readonly userId?: number | null;

  @ApiProperty({ description: 'The ID of the domain associated with the URL' })
  readonly domainId: number;

  @ApiProperty({
    description: 'The number of times the URL has been visited',
    default: 0,
  })
  readonly visitCount: number;

  @ApiProperty({ description: 'The date and time when the URL was created' })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the URL was last updated',
  })
  readonly updatedAt: Date;

  static fromDomain(url: Url): UrlDto {
    return {
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      userId: url.userId,
      domainId: url.domainId,
      visitCount: url.visitCount,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }

  static fromDomains(urls: Url[]): UrlDto[] {
    return urls.map((url) => this.fromDomain(url));
  }
}
