import { Controller, Get } from '@nestjs/common';
import { userInfo } from 'os';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { PrismaService } from './prisma/prisma.service';
import { UserEntity } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
