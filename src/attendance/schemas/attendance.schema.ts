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
  userID: Types.ObjectId;

  @Prop({ enum: AttendanceStatus, required: true })
  attendanceStatus: AttendanceStatus;

  @Prop({ type: String, required: true, index: true }) // Removed unique here
  date: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

// Compound unique index to prevent duplicate records per user per org per date
AttendanceSchema.index({ userID: 1, orgID: 1, date: 1 }, { unique: true });
