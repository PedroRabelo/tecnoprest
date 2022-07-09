import { ApiProperty } from '@nestjs/swagger';
import { LocationType, TenantMapLocation } from '@prisma/client';

export class MapLocationEntity implements TenantMapLocation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  title: string;
  type: LocationType;
  lat: string[];
  long: string[];
  @ApiProperty({ required: false })
  description: string;
  tenantId: string;
  isRoute: boolean;
  isPolygon: boolean;
}
