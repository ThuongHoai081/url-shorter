import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Url } from './domain/url.domain';
import { DomainService } from '../domain/domain.service';
import { UrlCreate } from './domain/url-create.domain';
import { generateCode } from 'dist/utils/url.utils';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private readonly domainService: DomainService,
  ) {}

  async create(urlCreate: UrlCreate): Promise<Url> {
    const domain = await this.domainService.findOrCreate(urlCreate.originalUrl);

    const shortCode = await this.generateNewCode(urlCreate.shortCode?.trim());

    const urlEntity = this.urlRepository.create({
      ...UrlCreate.toEntity(urlCreate),
      shortCode: shortCode,
      domain: domain,
    });

    const saved = await this.urlRepository.save(urlEntity);
    return Url.fromEntity(saved);
  }

  async findAll(): Promise<Url[]> {
    return Url.fromEntities(await this.urlRepository.find());
  }

  async findById(id: number): Promise<Url> {
    return Url.fromEntity(await this.findUrlOrThrow({ id }));
  }

  async remove(id: number): Promise<void> {
    await this.urlRepository.remove(await this.findUrlOrThrow({ id }));
  }

  async findByShortCode(shortCode: string): Promise<Url> {
    const urlEntity = await this.findUrlOrThrow({ shortCode });

    const urlUpdate = await this.incrementVisitCount(urlEntity);

    return Url.fromEntity(urlUpdate);
  }

  private async findUrlOrThrow(
    criterial: FindOptionsWhere<UrlEntity>,
  ): Promise<UrlEntity> {
    const urlEntity = await this.urlRepository.findOneBy(criterial);

    if (!urlEntity) {
      throw new NotFoundException(`Unable to find url`);
    }

    return urlEntity;
  }

  private async incrementVisitCount(url: UrlEntity): Promise<UrlEntity> {
    return await this.urlRepository.save({
      ...url,
      visitCount: url.visitCount + 1,
    });
  }

  private async generateNewCode(presetCode?: string | null): Promise<string> {
    let code = presetCode?.trim() || generateCode();

    while (await this.urlRepository.existsBy({ shortCode: code })) {
      code = generateCode();
    }

    return code;
  }
}
