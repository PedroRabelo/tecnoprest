import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @MinLength(3)
  slug: string;

  @IsOptional()
  @MaxLength(300)
  logoUrl?: string;

  @IsNotEmpty()
  @MaxLength(14)
  cnpj: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  contactName: string;

  @IsNotEmpty()
  @MinLength(10)
  contactNumber: string;

  @IsNotEmpty()
  @MaxLength(8)
  postalCode: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;
}
