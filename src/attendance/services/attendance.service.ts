import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from '../schemas/attendance.schema';
import { Model } from 'mongoose';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendace.dto';
import { AttendanceStatus } from '../schemas/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<Attendance>,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceModel.create(dto);
  }

  async update(id: string, dto: UpdateAttendanceDto): Promise<Attendance> {
    const updated = await this.attendanceModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Attendance record not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.attendanceModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Attendance record not found');
  }

  async getByUserID(userID: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ userID }).exec();
  }

  async getByOrgID(orgID: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ orgID }).exec();
  }

  async getByStatus(status: AttendanceStatus): Promise<Attendance[]> {
    return this.attendanceModel.find({ attendanceStatus: status }).exec();
  }

  async getByDateRange(from: Date, to: Date): Promise<Attendance[]> {
    return this.attendanceModel.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    }).exec();
  }
}
