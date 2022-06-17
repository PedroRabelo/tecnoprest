import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from '@prisma/client';

export class VehicleEntity implements Vehicle {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  licensePlate: string;

  @ApiProperty({ required: false })
  renavan: string;

  @ApiProperty({ required: false })
  chassi: string;

  @ApiProperty({ required: false })
  modelYear: number;

  @ApiProperty({ required: false })
  createdYear: number;

  @ApiProperty({ required: false })
  ownerCpf: string;

  @ApiProperty({ required: false })
  owner: string;

  @ApiProperty({ required: false })
  categoryId: string;

  @ApiProperty({ required: false })
  makeId: string;

  @ApiProperty({ required: false })
  modelId: string;

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }
}
