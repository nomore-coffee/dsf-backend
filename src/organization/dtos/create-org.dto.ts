import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsNumber, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/schemas/user.schema';

export class CreateOrgDto  {
  @ApiProperty({
    description: 'Organization name',
    example: 'Digital Shala Academy',
    type: String,
  })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({
    description: 'Organization email address',
    example: 'admin@digitalshala.com',
    type: String,
  })
  @IsEmail()
  orgEmail: string;

  @ApiProperty({
    description: 'Organization password (minimum 6 characters)',
    example: 'securePassword123',
    type: String,
    minLength: 6,
  })
  @IsNotEmpty()
  orgPassword: string;

  @ApiProperty({
    description: 'Organization active status',
    example: true,
    type: Boolean,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // User details for organization owner
  @ApiProperty({
    description: 'Organization owner name',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({
    description: 'Organization owner email address',
    example: 'john.doe@digitalshala.com',
    type: String,
  })
  @IsEmail()
  ownerEmail: string;

  @ApiProperty({
    description: 'Organization owner password (minimum 6 characters)',
    example: 'userPassword123',
    type: String,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  ownerPassword: string;
  
  @ApiProperty({
    description: 'Organization owner class/grade',
    example: 10,
    type: Number,
  })
  @IsNumber()
  ownerClass: number;

  @ApiProperty({
    description: 'Organization owner role',
    enum: UserRole,
    example: 'admin',
  })
  @IsEnum(UserRole)
  ownerRole: UserRole;
}

