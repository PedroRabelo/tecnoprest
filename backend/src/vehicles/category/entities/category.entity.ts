import { VehicleCategory } from '@prisma/client';

export class VehicleCategoryEntity implements VehicleCategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;

  constructor(partial: Partial<VehicleCategoryEntity>) {
    Object.assign(this, partial);
  }
}
