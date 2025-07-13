// DTOs for validation and input structure
import { IsEmail, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';
import {  Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Jane Doe',
    type: String,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jane.doe@digitalshala.com',
    type: String,
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'userPassword123',
    type: String,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  userPassword: string;
  
  @ApiProperty({
    description: 'User class/grade',
    example: 10,
    type: Number,
  })
  @IsNumber()
  userClass:Number;
  
  @ApiProperty({
    description: 'Organization ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  orgID: Types.ObjectId;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    example: 'student',
  })
  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Jane Updated',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    example: 'student',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'User class/grade',
    example: 10,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userClass?: Number;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'newPassword123',
    type: String,
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  userPassword?: string;

  @ApiProperty({
    description: 'Organization ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  orgID?: Types.ObjectId;
}
