import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from '../schemas/attendance.schema';
import { Model } from 'mongoose';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendace.dto';
import { AttendanceStatus } from '../schemas/attendance.schema';
import { ObjectId } from 'mongodb';
import monthDays from 'month-days';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private readonly attendanceModel: Model<Attendance>,
    @InjectModel(User.name) private readonly userModel: Model<User> // Assuming you have a User model for student list
  ) { }

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceModel.create({
      ...dto,
      orgID: new (require('mongoose').Types.ObjectId)(dto.orgID),
      userID: new (require('mongoose').Types.ObjectId)(dto.userID),
    });
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
    return this.attendanceModel.find({ userID: new (require('mongoose').Types.ObjectId)(userID) }).exec();
  }

  async getByOrgID(orgID: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ orgID }).exec();
  }

  async getByStatus(status: AttendanceStatus): Promise<Attendance[]> {
    return this.attendanceModel.find({ attendanceStatus: status }).exec();
  }

  async getByDateRange(from: Date, to: Date, userID: string): Promise<Attendance[]> {
    const records = await this.attendanceModel.aggregate(
      [
        {
          '$match': {
            'userID': new ObjectId(userID),
            'createdAt': {
              '$gte': new Date(from),
              '$lt': new Date(to)
            }
          }
        }, {
          '$project': {
            'year': { '$year': "$createdAt" },
            'month': {
              '$month': '$createdAt'
            },
            'attendanceStatus': 1
          }
        }, {
          '$group': {
            '_id': {
              'year': '$year',
              'month': '$month',
              'attendanceStatus': '$attendanceStatus'
            },
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$group': {
            '_id': {
              'year': "$_id.year",
              'month': "$_id.month"
            },
            'present': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': [
                      '$_id.attendanceStatus', 'present'
                    ]
                  }, '$count', 0
                ]
              }
            },
            'absent': {
              '$sum': {
                '$cond': [
                  {
                    '$eq': [
                      '$_id.attendanceStatus', 'absent'
                    ]
                  }, '$count', 0
                ]
              }
            },
            'totalMarked': {
              '$sum': '$count'
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]
    )
    records.map(record => {
      record.totalDays = new Date(record._id.year , record._id.month, 0).getDate();
    })
    return records
  }

  async getStudentList(orgID:string, userClass:number): Promise<any[]> {
    return this.userModel.find({userClass:userClass , orgID:orgID , role:"student"}).select('userName orgID _id')
  }
}
