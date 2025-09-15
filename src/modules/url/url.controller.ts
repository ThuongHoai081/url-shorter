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

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() urlCreateDto: UrlCreateDto): Promise<UrlDto> {
    return UrlDto.fromDomain(
      await this.urlService.create(UrlCreateDto.toUrlCreate(urlCreateDto)),
    );
  }

  @Get()
  async findAll(): Promise<UrlDto[]> {
    return UrlDto.fromDomains(await this.urlService.findAll());
  }

  @Get('id/:id')
  async findOne(@Param('id') id: number): Promise<UrlDto> {
    return UrlDto.fromDomain(await this.urlService.findById(id));
  }

  @Get(':code')
  async resolveUrl(@Param('code') code: string, @Res() res: Response) {
    const url = await this.urlService.findByShortCode(code);

    return res.redirect(301, urlEntity.originalUrl);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.urlService.remove(id);
  }
}
