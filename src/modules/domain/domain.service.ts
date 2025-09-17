import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainEntity } from './entities/domain.entity';
import { extractDomain } from 'src/utils/url.utils';
import { Domain } from './domain/domain';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(DomainEntity)
    private readonly domainRepository: Repository<DomainEntity>,
  ) {}

  async findOrCreate(originalUrl: string): Promise<Domain> {
    const domainName = extractDomain(originalUrl);

    const domainEntity = await this.domainRepository.findOneBy({
      name: domainName,
    });

    if (domainEntity) {
      return Domain.fromEntity(domainEntity);
    }

    return Domain.fromEntity(
      await this.domainRepository.save(
        this.domainRepository.create({
          name: domainName,
        }),
      ),
    );
  }

  async getTopDomain(limit = 100): Promise<Domain[]> {
    const domains = await this.baseTopDomainQuery(limit)
      .orderBy('COUNT(url.id)', 'DESC')
      .getMany();

    return Domain.fromEntities(domains);
  }

  async getTopVisitedDomain(limit = 100): Promise<Domain[]> {
    const domains = await this.baseTopDomainQuery(limit)
      .orderBy('COALESCE(SUM(url.visitCount), 0) ', 'DESC')
      .getMany();

    return Domain.fromEntities(domains);
  }

  private baseTopDomainQuery(limit: number | undefined) {
    return this.domainRepository
      .createQueryBuilder('domain')
      .leftJoin('domain.urls', 'url')
      .groupBy('domain.id')
      .limit(limit);
  }
}
