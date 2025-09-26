import { UserEntity } from '../../user/entities/user.entity';
import { Token } from './token';

export class AuthResult {
  readonly token: Token;

  readonly user: UserEntity;
}
