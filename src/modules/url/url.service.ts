import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { Url } from './domain/url.domain';
import { DomainService } from '../domain/domain.service';
import { UrlUpdate } from './domain/url-update.domain';
import { UrlCreate } from './domain/url-create.domain';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,

    private readonly domainService: DomainService,
  ) {}

   async create(urlCreate: UrlCreate): Promise<Url> {
    const domainId = await this.domainService.createOrGetDomainId(
      urlCreate.originalUrl,
    );

    const shortCode = urlCreate.shortCode ?? this.generateShortCode();

    const urlEntity = this.urlRepository.create({
      ...UrlCreate.toEntity(urlCreate),
      shortCode,
      domainId,
    });

    const saved = await this.urlRepository.save(urlEntity);
    return Url.fromEntity(saved);
  }

  private generateShortCode(length = 6): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
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

  async update(id: number, urlUpdate: UrlUpdate): Promise<Url> {
    const urlEntity = await this.findUrlOrThrow(id);

    return Url.fromEntity(
      await this.urlRepository.save({
        ...urlEntity,
        ...UrlUpdate.toEntity(urlUpdate),
      }),
    );
  }

  async remove(id: number): Promise<void> {
    const urlEntity = await this.findUrlOrThrow(id);

    await this.urlRepository.remove(urlEntity);
  }
  async incrementVisitCount(shortCode: string): Promise<void> {
    const url = await this.urlRepository.findOneBy({ shortCode });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.urlRepository.save({
       ...url,
       visitCount: url.visitCount + 1
    });
  }
}
