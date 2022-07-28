import { IsNotEmpty } from 'class-validator';

export class CreateMakerDto {
  @IsNotEmpty()
  name: string;
}
