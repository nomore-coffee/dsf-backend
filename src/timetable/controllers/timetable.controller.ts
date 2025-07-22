import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TimetableService } from '../services/timetable.service';
import { CreateTimetableDto, UpdateTimetableDto } from '../dtos/timetable.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('timetable')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER)
  create(@Body() dto: CreateTimetableDto) {
    return this.timetableService.create(dto);
  }

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.timetableService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER)
  update(@Param('id') id: string, @Body() dto: UpdateTimetableDto) {
    return this.timetableService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER)
  delete(@Param('id') id: string) {
    return this.timetableService.delete(id);
  }
} 