import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/users/schemas/user.schema';

export class CreateOrgDto  {
  @IsNotEmpty()
  orgName: string;

  @IsEmail()
  orgEmail: string;

  @IsNotEmpty()
  orgPassword: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // User details for organization owner
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsEmail()
  ownerEmail: string;

  @IsString()
  @MinLength(6)
  ownerPassword: string;
  
  @IsNumber()
  ownerClass: number;

  @IsEnum(UserRole)
  ownerRole: UserRole;
}

