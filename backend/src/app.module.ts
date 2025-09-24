import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AppDataSource } from './database/data-source';
import { UrlModule } from './modules/url/url.module';
import { DomainModule } from './modules/domain/domain.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => AppDataSource.options,
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    }),
    UserModule,
    UrlModule,
    DomainModule,
    KeycloakModule,
  ],
})
export class AppModule {}
