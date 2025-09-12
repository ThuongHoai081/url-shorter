import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainEntity } from './entities/domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(DomainEntity)
    private readonly domainRepository: Repository<DomainEntity>,
  ) {}

  async createOrGetDomainId(originalUrl: string): Promise<number> {
    const domainName = this.extractDomain(originalUrl);

    let domainEntity = await this.domainRepository.findOneBy({
      name: domainName,
    });

    if (!domainEntity) {
      domainEntity = this.domainRepository.create({ name: domainName });
      domainEntity = await this.domainRepository.save(domainEntity);
    }

    const domainId = domainEntity.id;

    return domainId;
  }

  private extractDomain(originalUrl: string): string {
    const url = new URL(originalUrl);

    return url.hostname;
  }
}
