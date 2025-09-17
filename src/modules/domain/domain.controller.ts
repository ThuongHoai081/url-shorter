import { Controller, Get } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainDto } from './dto/domain.dto';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get('top-domain')
  async getTopDomain(): Promise<DomainDto[]> {
    return DomainDto.fromDomains(await this.domainService.getTopDomain(100));
  }

  @Get('top-visited-domain')
  async getTopVisitedDomain(): Promise<DomainDto[]> {
    return DomainDto.fromDomains(
      await this.domainService.getTopVisitedDomain(100),
    );
  }
}
