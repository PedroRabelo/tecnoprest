import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/resources/user/entities/user.entity';
import { AuthRequest } from '../models/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
