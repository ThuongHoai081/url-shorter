import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity]), DomainModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
