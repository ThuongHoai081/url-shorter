import { ApiProperty } from '@nestjs/swagger';

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
}
