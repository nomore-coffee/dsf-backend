import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Subject } from '../schemas/material.schema';

export class CreateMaterialDto {
  @IsMongoId()
  orgID: string;

  @IsMongoId()
  userID: string;

  @IsNumber()
  forClass: number;

  @IsString()
  materialTitle: string;

  @IsString()
  materialUrl: string;

  @IsEnum(Subject)
  materialSubject: Subject;
}

export class UpdateMaterialDto {
  @IsNumber()
  forClass?: number;

  @IsString()
  materialTitle?: string;

  @IsString()
  materialUrl?: string;

  @IsEnum(Subject)
  materialSubject?: Subject;
}
