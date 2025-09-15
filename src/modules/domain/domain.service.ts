import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainEntity } from './entities/domain.entity';
import { extractDomain } from 'src/utils/url.utils';

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
           domain: domainName
        })
      );
  }
  
}
