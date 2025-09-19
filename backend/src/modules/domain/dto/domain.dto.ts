import { ApiProperty } from '@nestjs/swagger';
import { Domain } from '../domain/domain';

export class DomainDto {
  @ApiProperty({ description: 'The unique ID of the domain' })
  readonly id: number;

  @ApiProperty({
    description: 'The name of the domain',
    example: 'example.com',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Optional description of the domain',
    required: false,
    nullable: true,
  })
  readonly description?: string | null;

  @ApiProperty({ description: 'The date and time when the domain was created' })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the domain was last updated',
  })
  readonly updatedAt: Date;

  static fromDomain(domain: Domain): DomainDto {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static fromDomains(domains: Domain[]): DomainDto[] {
    return domains.map((domain) => this.fromDomain(domain));
  }
}
