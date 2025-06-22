import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LEAVE = 'leave',
}

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Org', required: true })
  orgID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userID: Types.ObjectId

  @Prop({ enum: AttendanceStatus,required:true})
  attendanceStatus : AttendanceStatus
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
