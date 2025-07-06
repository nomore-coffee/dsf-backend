import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Subject } from '../schemas/material.schema';

export class CreateMaterialDto {
  @IsMongoId()
  orgID: string;

  @IsMongoId()
  userID: string;

  @IsNumber()
  forClass: number;

  @IsString()
  @IsNotEmpty()
  materialTitle: string;

  @IsEnum(Subject)
  materialSubject: Subject;
}

export class UpdateMaterialDto {
  @IsOptional()
  @IsNumber()
  forClass?: number;

  @IsOptional()
  @IsString()
  materialTitle?: string;

  @IsOptional()
  @IsEnum(Subject)
  materialSubject?: Subject;
}

export class UploadMaterialDto {
  @IsMongoId()
  orgID: string;

  @IsMongoId()
  userID: string;

  @IsNumber()
  forClass: number;

  @IsString()
  @IsNotEmpty()
  materialTitle: string;

  @IsEnum(Subject)
  materialSubject: Subject;
}
