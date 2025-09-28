import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenForm } from '../domain/refresh-token-form';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenFormDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;

  public static toRefreshTokenForm(dto: RefreshTokenFormDto): RefreshTokenForm {
    return {
      refreshToken: dto.refreshToken,
    };
  }
}
