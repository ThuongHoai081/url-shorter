import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';
import { UrlUpdateDto } from './dto/url-update.dto';
import { UrlCreateDto } from './dto/url-create.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UrlDto> {
    return UrlDto.fromDomain(await this.urlService.findById(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() urlUpdateDto: UrlUpdateDto,
  ): Promise<UrlDto> {
    return UrlDto.fromDomain(
      await this.urlService.update(id, UrlUpdateDto.toUrlUpdate(urlUpdateDto)),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.urlService.remove(id);
  }
}
