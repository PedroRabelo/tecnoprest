import { Tracker } from '@prisma/client';

export class TrackerEntity implements Tracker {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  trackNumber: string;
  technology: string;
  vehicleId: string;
}
