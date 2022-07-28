import { IsNotEmpty } from 'class-validator';

export class CreateTrackerDto {
  @IsNotEmpty()
  trackNumber: string;
  @IsNotEmpty()
  technology: string;
}
