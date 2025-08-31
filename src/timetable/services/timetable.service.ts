import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable } from '../schemas/timetable.schema';
import { CreateTimetableDto, UpdateTimetableDto } from '../dtos/timetable.dto';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(Timetable.name) private timetableModel: Model<Timetable>,
  ) {}

  async create(dto: CreateTimetableDto): Promise<Timetable> {
    const created = new this.timetableModel(dto);
    return created.save();
  }

  async findAll(): Promise<Timetable[]> {
    return this.timetableModel.find();
  }

  async findById(id: string): Promise<Timetable> {
    const timetable = await this.timetableModel.findById(id);
    if (!timetable) throw new NotFoundException('Timetable not found');
    return timetable;
  }

  async update(id: string, dto: UpdateTimetableDto): Promise<Timetable> {
    const updated = await this.timetableModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Timetable not found');
    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.timetableModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Timetable not found');
    return { message: "Timetable Deleted Successfully"} as any;
  }
} 