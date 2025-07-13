import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../schemas/attendance.schema';

export class CreateAttendanceDto {
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
    description: 'Attendance status',
    enum: AttendanceStatus,
    example: 'present',
  })
  @IsEnum(AttendanceStatus)
  attendanceStatus: AttendanceStatus;
}

export class UpdateAttendanceDto {
  @ApiProperty({
    description: 'Attendance status',
    enum: AttendanceStatus,
    example: 'absent',
  })
  @IsEnum(AttendanceStatus)
  attendanceStatus: AttendanceStatus;
}
