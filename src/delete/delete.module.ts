import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';
import { MaterialService } from 'src/material/services/material.service';
import { TimetableService } from 'src/timetable/services/timetable.service';
import { UserService } from 'src/users/services/user.service';
import { NoticeService } from 'src/notice/services/notice.service';
import { MaterialModule } from 'src/material/material.module';
import { TimetableModule } from 'src/timetable/timetable.module';
import { UserModule } from 'src/users/user.module';
import { NoticeModule } from 'src/notice/notice.module';

@Module({
  imports: [ MaterialModule , TimetableModule , UserModule , NoticeModule ],
  controllers: [DeleteController],
    // providers: [MaterialService , TimetableService , UserService , NoticeService],
  
})
export class DeleteModule {}
