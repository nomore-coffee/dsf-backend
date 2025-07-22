import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrgModule } from './organization/org.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { NoticeModule } from './notice/notice.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [
    OrgModule,
    UserModule,
    AuthModule,
    MaterialModule,
    NoticeModule,
    AttendanceModule,
    TimetableModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL || 'mongodb+srv://dsf_main:digital%402025@cluster0.1texgvj.mongodb.net/digitalShala')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
