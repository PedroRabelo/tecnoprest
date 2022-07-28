import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  email: string;
  password: string;
  name: string;
  role: Role;
  assignedBy: string;
  tenantId: string;
}
