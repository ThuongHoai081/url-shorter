/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserEntity } from '../user/entities/user.entity';
import { RoleType } from '../../guards/role-type';
import { emptyUuid } from 'src/utils/uuid.utils';
import { Uuid } from 'src/common/types';

export const guestUser: Partial<UserEntity> = {
  id: 0,
  keyCloakId: emptyUuid,
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: 'Guest',
  lastName: 'Guest',
  email: 'Guest',
  role: RoleType.GUEST,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(
    config: ApiConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      ignoreExpiration: false,
      algorithms: ['RS256'],
      jwtFromRequest: JwtStrategy.jwtFromRequest,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.keycloakJwtConfig.jwksUri,
      }),
    });
  }

  authenticate(req: any, options?: any) {
    const token = JwtStrategy.jwtFromRequest(req);

    if (!token) {
      req.user = guestUser;
      this.success(guestUser);

      return;
    }

    super.authenticate(req, options);
  }

  public async validate(args: IJwtPayload): Promise<UserEntity | null> {
    const userId = args.sub as Uuid;

    return await this.userRepository.findOneBy({
      keyCloakId: userId,
    });
  }
}

interface IJwtPayload {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
