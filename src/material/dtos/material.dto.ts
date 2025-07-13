import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '../schemas/material.schema';

export class CreateMaterialDto {
  @ApiProperty({
    description: 'Organization ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  orgID: string;

  @ApiProperty({
    description: 'User ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
    type: String,
  })
  @IsMongoId()
  userID: string;

  @ApiProperty({
    description: 'Class/grade for which the material is intended',
    example: 10,
    type: Number,
  })
  @IsNumber()
  forClass: number;

  @ApiProperty({
    description: 'Title of the educational material',
    example: 'Maths Chapter 1 - Algebra',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  materialTitle: string;

  @ApiProperty({
    description: 'Subject of the material',
    enum: Subject,
    example: 'math',
  })
  @IsEnum(Subject)
  materialSubject: Subject;
}

export class UpdateMaterialDto {
  @ApiProperty({
    description: 'Class/grade for which the material is intended',
    example: 10,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  forClass?: number;

  @ApiProperty({
    description: 'Title of the educational material',
    example: 'Updated Maths Chapter 1',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  materialTitle?: string;

  @ApiProperty({
    description: 'Subject of the material',
    enum: Subject,
    example: 'math',
    required: false,
  })
  @IsOptional()
  @IsEnum(Subject)
  materialSubject?: Subject;
}

export class UploadMaterialDto {
  @ApiProperty({
    description: 'Organization ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  orgID: string;

  @ApiProperty({
    description: 'User ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
    type: String,
  })
  @IsMongoId()
  userID: string;

  @ApiProperty({
    description: 'Class/grade for which the material is intended',
    example: 10,
    type: Number,
  })
  @IsNumber()
  forClass: number;

  @ApiProperty({
    description: 'Title of the educational material',
    example: 'Maths Chapter 1 - Algebra',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  materialTitle: string;

  @ApiProperty({
    description: 'Subject of the material',
    enum: Subject,
    example: 'math',
  })
  @IsEnum(Subject)
  materialSubject: Subject;
}
