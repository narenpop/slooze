import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '../common/roles';
import { LoginDto } from './login.dto';

type SessionPayload = {
  id: string;
  email: string;
  role: Role;
  accessToken: string;
};

@Injectable()
export class AuthService {
  async login(credentials: LoginDto): Promise<SessionPayload> {
    const isManager = credentials.email.endsWith('@manager.slooze.com');
    const isStoreKeeper = credentials.email.endsWith('@storekeeper.slooze.com');

    if (!isManager && !isStoreKeeper) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const role = isManager ? Role.MANAGER : Role.STORE_KEEPER;

    return {
      id: crypto.randomUUID(),
      email: credentials.email,
      role,
      accessToken: Buffer.from(`${credentials.email}:${role}`).toString('base64'),
    };
  }
}
