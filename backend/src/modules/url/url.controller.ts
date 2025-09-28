import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';
import { UrlCreateDto } from './dto/url-create.dto';
import type { Response } from 'express';
import { RequireLoggedIn } from 'src/guards/role-container';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async create(
    @AuthUser() user: UserEntity,
    @Body() urlCreateDto: UrlCreateDto,
  ): Promise<UrlDto> {
    return UrlDto.fromDomain(
      await this.urlService.create(
        UrlCreateDto.toUrlCreate(urlCreateDto),
        user,
      ),
    );
  }

  @Get()
  async findAll(): Promise<UrlDto[]> {
    return UrlDto.fromDomains(await this.urlService.findAll());
  }

  @Get('id/:id')
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async findOne(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
  ): Promise<UrlDto> {
    return UrlDto.fromDomain(await this.urlService.findById(id, user));
  }

  @Get(':code')
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async resolveUrl(
    @AuthUser() user: UserEntity,
    @Param('code') code: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.findByShortCode(code, user);

    return res.redirect(301, url.originalUrl);
  }

  @Delete(':id')
  @RequireLoggedIn()
  @ApiBearerAuth('access-token')
  async remove(
    @AuthUser() user: UserEntity,
    @Param('id') id: number,
  ): Promise<void> {
    await this.urlService.remove(id, user);
  }
}
