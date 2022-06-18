import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantEntity } from 'src/tenants/entities/tenant.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tenantService: TenantsService,
  ) {}

  async login(user: UserEntity): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      tenantId: user.tenantId,
    };

    const jwtToken = this.jwtService.sign(payload);

    let userTenant: TenantEntity;
    if (payload.tenantId) {
      userTenant = await this.tenantService.findOne(payload.tenantId);
    }

    return {
      access_token: jwtToken,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      slug: userTenant?.slug,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
