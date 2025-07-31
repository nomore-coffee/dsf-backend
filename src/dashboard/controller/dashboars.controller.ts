import { Controller, Get, Query } from '@nestjs/common';
import { MaterialService } from '../../material/services/material.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly materialService: MaterialService,
    @InjectModel('Timetable') private readonly timetableModel: Model<any>,
  ) {}

  @Get()
  async getDashboardData(@Query('organization') organization: string) {
    if (!organization) {
      return { error: 'Organization query parameter is required' };
    }

    const [materials, timetables] = await Promise.all([
      this.materialService.findByOrg(organization),
      this.timetableModel.find({ organization }).limit(10).exec(),
    ]);

    return {
      materials,
      timetables,
    };
  }
}