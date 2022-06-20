import { VehicleMake } from '@prisma/client';

export class VehicleMakeEntity implements VehicleMake {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;

  constructor(partial: Partial<VehicleMakeEntity>) {
    Object.assign(this, partial);
  }
}
