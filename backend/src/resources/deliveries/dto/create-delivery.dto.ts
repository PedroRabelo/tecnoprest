import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  routeName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  origin: string;

  @IsNotEmpty()
  originLatLong: string[];
}
