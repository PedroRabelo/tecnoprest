import { LocationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMapLocationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(LocationType)
  type: LocationType;

  @IsNotEmpty()
  lat: string[];

  @IsNotEmpty()
  long: string[];

  @IsOptional()
  description: string;

  @IsNotEmpty()
  isRoute: boolean;

  @IsNotEmpty()
  isPolygon: boolean;
}
