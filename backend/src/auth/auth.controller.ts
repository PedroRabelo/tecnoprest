import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TenantEntity } from 'src/resources/tenants/entities/tenant.entity';
import { TenantsService } from 'src/resources/tenants/tenants.service';
import { UserEntity } from 'src/resources/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tenantService: TenantsService,
  ) { }

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @ApiBearerAuth()
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    if (user.tenantId) {
      const tenant: TenantEntity = await this.tenantService.findOne(
        user.tenantId,
      );

      return {
        ...user,
        slug: tenant?.slug,
      };
    }

    return {
      ...user,
    };
  }
}
