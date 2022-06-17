import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  licensePlate: string;

  @IsOptional()
  renavan: string;

  @IsOptional()
  chassi: string;

  @IsOptional()
  modelYear: number;

  @IsOptional()
  createdYear: number;

  @IsOptional()
  ownerCpf: string;

  @IsOptional()
  owner: string;

  @IsOptional()
  categoryId: string;

  @IsOptional()
  makeId: string;

  @IsOptional()
  modelId: string;
}
