import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendace.dto';
import { AttendanceStatus } from '../schemas/attendance.schema';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create attendance record' })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({ status: 201, description: 'Attendance record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  create(@Body() dto: CreateAttendanceDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attendance record' })
  @ApiParam({ name: 'id', description: 'Attendance ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Attendance record updated successfully' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance record' })
  @ApiParam({ name: 'id', description: 'Attendance ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Attendance record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('user/:userID')
  @ApiOperation({ summary: 'Get attendance records by user' })
  @ApiParam({ name: 'userID', description: 'User ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully' })
  getByUserID(@Param('userID') userID: string) {
    return this.service.getByUserID(userID);
  }

  @Get('org/:orgID')
  @ApiOperation({ summary: 'Get attendance records by organization' })
  @ApiParam({ name: 'orgID', description: 'Organization ID', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully' })
  getByOrgID(@Param('orgID') orgID: string) {
    return this.service.getByOrgID(orgID);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get attendance records by status' })
  @ApiParam({ name: 'status', description: 'Attendance status', enum: AttendanceStatus, example: 'present' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully' })
  getByStatus(@Param('status') status: AttendanceStatus) {
    return this.service.getByStatus(status);
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Get attendance records by date range' })
  @ApiQuery({ name: 'from', required: true, description: 'Start date (YYYY-MM-DD)', example: '2024-01-01' })
  @ApiQuery({ name: 'to', required: true, description: 'End date (YYYY-MM-DD)', example: '2024-01-31' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid date format' })
  getByDateRange(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('userID') userID: string
  ) {
    return this.service.getByDateRange(new Date(from), new Date(to) , userID); ;
  }
}
