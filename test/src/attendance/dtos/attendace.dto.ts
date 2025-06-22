import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { AttendanceStatus } from '../schemas/attendance.schema';

export class CreateAttendanceDto {
  @IsMongoId()
  orgID: string;

  @IsMongoId()
  userID: string;

  @IsEnum(AttendanceStatus)
  attendanceStatus: AttendanceStatus;
}

export class UpdateAttendanceDto {
  @IsEnum(AttendanceStatus)
  attendanceStatus: AttendanceStatus;
}
