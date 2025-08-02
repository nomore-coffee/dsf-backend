import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schemas/attendance.schema';
import { AttendanceService } from './services/attendance.service';
import { AttendanceController } from './controllers/attendace.controller';
import { User } from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema } , {name: 'User', schema: User }])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
