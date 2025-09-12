import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';
import { UrlUpdate } from '../domain/url-update.domain';

export class UrlUpdateDto {
  @ApiPropertyOptional({
    example: 'https://nestjs.com/',
    description: 'The original URL to update',
  })
  @IsOptional()
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  @IsString({ message: 'originalUrl must be a string' })
  readonly originalUrl?: string;

  @ApiPropertyOptional({
    example: 'abc123',
    description: 'Optional short code to update',
  })
  @IsOptional()
  @IsString({ message: 'shortCode must be a string' })
  readonly shortCode?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Optional domain ID; usually auto-managed',
  })
  @IsOptional()
  @IsNumber({}, { message: 'domainId must be a number' })
  readonly domainId?: number;

  static toUrlUpdate(urlUpdateDto: UrlUpdateDto): UrlUpdate {
    return {
      originalUrl: urlUpdateDto.originalUrl,
      shortCode: urlUpdateDto.shortCode,
      domainId: urlUpdateDto.domainId,
    };
  }
}
