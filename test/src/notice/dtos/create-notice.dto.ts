// dto/create-notice.dto.ts
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsMongoId, IsDateString, IsNumber } from 'class-validator';
import { NoticeType } from '../schemas/notice.schema';

export class CreateNoticeDto {
  @IsMongoId()
  @IsNotEmpty()
  orgID: string;

  @IsMongoId()
  @IsNotEmpty()
  userID: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  forClass: number;

  @IsString()
  @IsNotEmpty()
  noticeTitle: string;

  @IsString()
  @IsNotEmpty()
  noticeBody: string;

  @IsEnum(NoticeType)
  @IsNotEmpty()
  noticeType: NoticeType;

  @IsString()
  @IsOptional()
  noticeImage?: string;
}
