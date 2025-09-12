import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlCreateDto } from './dto/url-create.dto';
import { UrlDto } from './dto/url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() urlCreateDto: UrlCreateDto): Promise<UrlDto> {
    return UrlDto.fromDomain(
      await this.urlService.create(UrlCreateDto.toUrlCreate(urlCreateDto)),
    );
  }
}
