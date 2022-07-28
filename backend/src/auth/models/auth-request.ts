import { Request } from 'express';
import { UserEntity } from 'src/resources/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
