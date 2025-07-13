// dto/create-notice.dto.ts
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsMongoId, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoticeType } from '../schemas/notice.schema';

export class CreateNoticeDto {
  @ApiProperty({
    description: 'Organization ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  orgID: string;

  @ApiProperty({
    description: 'User ID (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  userID: string;

  @ApiProperty({
    description: 'Date and time of the notice',
    example: '2024-01-15T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Class/grade for which the notice is intended',
    example: 10,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  forClass: number;

  @ApiProperty({
    description: 'Title of the notice',
    example: 'Annual Sports Day',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  noticeTitle: string;

  @ApiProperty({
    description: 'Content/body of the notice',
    example: 'Annual sports day will be held on 15th January 2024. All students are requested to participate.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  noticeBody: string;

  @ApiProperty({
    description: 'Type of notice',
    enum: NoticeType,
    example: 'sport',
  })
  @IsEnum(NoticeType)
  @IsNotEmpty()
  noticeType: NoticeType;

  @ApiProperty({
    description: 'Optional image URL for the notice',
    example: 'https://example.com/sports-image.jpg',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  noticeImage?: string;
}
