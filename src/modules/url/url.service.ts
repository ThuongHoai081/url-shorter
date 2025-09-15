import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { Url } from './domain/url.domain';
import { DomainService } from '../domain/domain.service';
import { UrlCreate } from './domain/url-create.domain';
import { generateShortCode } from 'src/utils/url.utils';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,

    private readonly domainService: DomainService,
  ) {}

  async create(urlCreate: UrlCreate): Promise<Url> {
    const domainId = await this.domainService.findOrCreate(
      urlCreate.originalUrl,
    );

    const shortCode = urlCreate.shortCode?.trim() || generateShortCode();

    const urlEntity = this.urlRepository.create({
      ...UrlCreate.toEntity(urlCreate),
      shortCode: shortCode,
      domain: domainId,
    });

    console.log(urlEntity);

    const saved = await this.urlRepository.save(urlEntity);
    return Url.fromEntity(saved);
  }

  async findAll(): Promise<Url[]> {
    const urlEntities = await this.urlRepository.find();
    return Url.fromEntities(urlEntities);
  }

  async findById(id: number): Promise<Url> {
    const urlEntity = await this.findUrlOrThrow(id);

    return Url.fromEntity(urlEntity);
  }

  private async findUrlOrThrow(id: number): Promise<UrlEntity> {
    const urlEntity = await this.urlRepository.findOneBy({ id });

    if (!urlEntity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return urlEntity;
  }

  async remove(id: number): Promise<void> {
    const urlEntity = await this.findUrlOrThrow(id);

    await this.urlRepository.remove(urlEntity);
  }

  async findByShortCode(shortCode: string): Promise<Url> {
    const urlEntity = await this.findShortCodeOrThrow(shortCode);

    const urlUpdate = await this.incrementVisitCount(urlEntity);

    return Url.fromEntity(urlUpdate);
  }

  private async findShortCodeOrThrow(shortCode: string): Promise<UrlEntity> {
    const urlEntity = await this.urlRepository.findOneBy({ shortCode });

    if (!urlEntity) {
      throw new NotFoundException(`User with shortCode ${shortCode} not found`);
    }

    return urlEntity;
  }

  async incrementVisitCount(url: UrlEntity): Promise<UrlEntity> {
    return await this.urlRepository.save({
      ...url,
      visitCount: url.visitCount + 1,
    });
  }
}
