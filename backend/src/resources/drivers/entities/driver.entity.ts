import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '@prisma/client';

export class DriverEntity implements Driver {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  cpf: string;
  rg: string;
  rgUf: string;
  driverLicense: string;
  driverLicenseCategory: string;
  driverLicenseDate: Date;
  driverLicenseExpires: Date;
  phoneNumber: string;
  email: string;

  @ApiProperty({ required: false })
  postalCode: string;

  @ApiProperty({ required: false })
  streetAddress: string;

  @ApiProperty({ required: false })
  city: string;

  @ApiProperty({ required: false })
  state: string;

  @ApiProperty({ required: false })
  country: string;

  @ApiProperty({ required: false })
  mopp: string;

  @ApiProperty({ required: false })
  moppExpires: Date;

  @ApiProperty({ required: false })
  languages: string[];

  @ApiProperty({ required: false })
  emergencyPhone: string;

  constructor(partial: Partial<DriverEntity>) {
    Object.assign(this, partial);
  }
}
