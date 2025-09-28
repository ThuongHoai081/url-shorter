import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AppDataSource } from './database/data-source';
import { UrlModule } from './modules/url/url.module';
import { DomainModule } from './modules/domain/domain.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core/constants';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './decorator/jwt-auth-guard';
import { LoggingExceptionFilter } from './filter/error-handling-exception-filter';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
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
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
