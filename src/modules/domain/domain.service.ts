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

  async getTopDomain(limit = 100): Promise<DomainEntity[]> {
    return await this.baseTopDomainQuery(limit)
      .orderBy('COUNT(url.id)', 'DESC')
      .getRawMany();
  }

  async getTopVisitedDomain(limit = 100): Promise<DomainEntity[]> {
    return await this.baseTopDomainQuery(limit)
      .orderBy('COALESCE(SUM(url.visitCount), 0) ', 'DESC')
      .getRawMany();
  }

  private baseTopDomainQuery(limit = 100) {
    return this.domainRepository
      .createQueryBuilder('domain')
      .select(['domain.id AS id', 'domain.name AS name'])
      .leftJoin('domain.urls', 'url')
      .groupBy('domain.id')
      .limit(limit);
  }
}
