import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendace.dto';
import { AttendanceStatus } from '../schemas/attendance.schema';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  create(@Body() dto: CreateAttendanceDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('user/:userID')
  getByUserID(@Param('userID') userID: string) {
    return this.service.getByUserID(userID);
  }

  @Get('org/:orgID')
  getByOrgID(@Param('orgID') orgID: string) {
    return this.service.getByOrgID(orgID);
  }

  @Get('status/:status')
  getByStatus(@Param('status') status: AttendanceStatus) {
    return this.service.getByStatus(status);
  }

  @Get('date-range')
  getByDateRange(
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.service.getByDateRange(new Date(from), new Date(to));
  }
}
