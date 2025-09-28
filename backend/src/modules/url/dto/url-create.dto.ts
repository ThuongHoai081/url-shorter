import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { UrlCreate } from '../domain/url-create.domain';

export class UrlCreateDto {
  @ApiProperty({
    example: 'https://nestjs.com/',
    description: 'The original URL to shorten',
  })
  @IsNotEmpty({ message: 'originalUrl is required' })
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  readonly originalUrl: string;

  @ApiProperty({
    example: 'abc123',
    description: 'Optional short code; auto-generated if not provided',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'shortCode must be a string' })
  readonly shortCode?: string;

  static toUrlCreate(dto: UrlCreateDto): UrlCreate {
    return {
      originalUrl: dto.originalUrl,
      shortCode: dto.shortCode ?? '',
    };
  }
}
