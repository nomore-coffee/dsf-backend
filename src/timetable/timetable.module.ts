import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timetable, TimetableSchema } from './schemas/timetable.schema';
import { TimetableService } from './services/timetable.service';
import { TimetableController } from './controllers/timetable.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Timetable.name, schema: TimetableSchema }])],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService],
})
export class TimetableModule {} 