import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
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

  @ApiProperty({
    example: 1,
    description: 'Optional ID of the user creating the URL',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly userId?: number;

  @ApiProperty({
    example: 1,
    description:
      'Optional domain ID (will be set automatically if not provided)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly domainId?: number;

  @ApiProperty({
    example: 0,
    description: 'Optional visit count; defaults to 0',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly visitCount?: number;

  static toUrlCreate(dto: UrlCreateDto): UrlCreate {
    return {
      originalUrl: dto.originalUrl,
      shortCode: dto.shortCode ?? '',
      userId: dto.userId ?? 0,
      domainId: dto.domainId ?? 0,
      visitCount: dto.visitCount ?? 0,
    };
  }
}
