import { VehicleModel } from '@prisma/client';

export class VehicleModelEntity implements VehicleModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  makeId: string;

  constructor(partial: Partial<VehicleModelEntity>) {
    Object.assign(this, partial);
  }
}
