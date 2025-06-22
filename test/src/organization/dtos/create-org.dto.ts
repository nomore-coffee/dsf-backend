import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrgDto {
  @IsNotEmpty()
  orgName: string;

  @IsEmail()
  orgEmail: string;

  @IsNotEmpty()
  orgPassword: string;

  @IsNotEmpty()
  orgOwner: string; // should be a valid ObjectId

  @IsBoolean()
  isActive:boolean
}

