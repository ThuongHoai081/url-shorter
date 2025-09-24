import { Injectable, OnModuleInit } from '@nestjs/common';
import { KeycloakAdminClient } from '@s3pweb/keycloak-admin-client-cjs';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { KeycloakUser } from './domain/keycloak-user';

@Injectable()
export class KeycloakService implements OnModuleInit {
  private readonly keycloakAdminClient: KeycloakAdminClient;

  constructor(private readonly configService: ApiConfigService) {
    this.keycloakAdminClient = new KeycloakAdminClient(
      this.configService.keycloakConfig,
    );
  }

  async onModuleInit() {}

  async createUser(user: KeycloakUser) {
    return this.keycloakAdminClient.users.create({
      email: user.email,
      username: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      enabled: true,
      credentials:
        user.password == null
          ? undefined
          : [
              {
                type: 'password',
                value: user.password,
                temporary: false,
              },
            ],
    });
  }
}
