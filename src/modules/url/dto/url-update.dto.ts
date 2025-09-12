import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UrlUpdate } from '../domain/url-update.domain';

export class UrlUpdateDto {
  @ApiProperty({
    example: 'https://nestjs.com/',
    description: 'The original URL to shorten',
  })
  @IsNotEmpty({ message: 'originalUrl is required' })
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  readonly originalUrl?: string;

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

  static toUrlUpdate(dto: UrlUpdateDto): UrlUpdate {
    return {
      originalUrl: dto.originalUrl,
      shortCode: dto.shortCode,
      userId: dto.userId,
    };
  }
}
