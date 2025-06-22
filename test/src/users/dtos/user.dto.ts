// DTOs for validation and input structure
import { IsEmail, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user.schema';
import {  Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(6)
  userPassword: string;
  
  @IsNumber()
  userClass:Number;
  
  @IsMongoId()
  orgID: Types.ObjectId;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsNumber()
  userClass:Number;

  @IsOptional()
  @IsString()
  @MinLength(6)
  userPassword?: string;
}
