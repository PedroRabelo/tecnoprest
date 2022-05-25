import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  name: string;
}
