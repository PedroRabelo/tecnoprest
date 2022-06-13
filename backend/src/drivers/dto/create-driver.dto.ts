import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MaxLength(11)
  cpf: string;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  rgUf: string;

  @IsNotEmpty()
  driverLicense: string;

  @IsNotEmpty()
  driverLicenseCategory: string;

  @IsNotEmpty()
  driverLicenseDate: Date;

  @IsNotEmpty()
  driverLicenseExpires: Date;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  postalCode: string;

  @IsOptional()
  streetAddress: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  country: string;

  @IsOptional()
  mopp: string;

  @IsOptional()
  moppExpires: Date;

  @IsOptional()
  languages: string[];

  @IsOptional()
  emergencyPhone: string;
}
