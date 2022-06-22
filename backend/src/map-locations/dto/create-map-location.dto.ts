import { LocationType } from '@prisma/client';

export class CreateMapLocationDto {
  title: string;
  type: LocationType;
  lat: string[];
  long: string[];
  description: string;
}
