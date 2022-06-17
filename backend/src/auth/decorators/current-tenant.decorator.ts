import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/auth-request';

export const CurrentTenant = createParamDecorator(
  (data: unknown, context: ExecutionContext): String => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user.tenantId;
  },
);
