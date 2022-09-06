import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
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
  originLatitude: string;

  @IsNotEmpty()
  originLongitude: string;
}
