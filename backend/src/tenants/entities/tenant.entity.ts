import { ApiProperty } from '@nestjs/swagger';
import { Tenant } from '@prisma/client';

export class TenantEntity implements Tenant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  slug: string;

  @ApiProperty({ required: false })
  logoUrl: string;

  cnpj: string;
  name: string;
  email: string;
  contactName: string;
  contactNumber: string;
  postalCode: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;

  constructor(partial: Partial<TenantEntity>) {
    Object.assign(this, partial);
  }
}
