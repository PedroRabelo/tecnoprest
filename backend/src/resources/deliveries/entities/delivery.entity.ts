import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from '@prisma/client';

export class DeliveryEntity implements Delivery {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  startDate: Date;
  routeName: string;
  origin: string;
  originLatitude: string;
  originLongitude: string;

  tenantId: string;

  @ApiProperty({ required: false })
  vehicleId: string;
  @ApiProperty({ required: false })
  driverId: string;

  constructor(partial: Partial<DeliveryEntity>) {
    Object.assign(this, partial);
  }
}
