import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { UrlCreate } from './domain/url-create.domain';
import { Url } from './domain/url.domain';
import { DomainService } from '../domain/domain.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,

    private readonly domainService: DomainService,
  ) {}

  async create(urlCreate: UrlCreate): Promise<Url> {
    await this.verifyUrlIsNotExisting(urlCreate.originalUrl);

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

  private async verifyUrlIsNotExisting(originalUrl: string): Promise<void> {
    const exists = await this.urlRepository.findOneBy({ originalUrl });

    if (exists) {
      throw new BadRequestException('originalUrl already exists');
    }
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
}
