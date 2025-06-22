import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum NoticeType {
  EXAM = 'exam',
  SPORT = 'sport',
  HOLIDAY = 'holiday',
  EXTRA_ACTIVITY = 'extra',
}

@Schema({ timestamps: true })
export class Notice extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Org', required: true })
  orgID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userID: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  forClass: number;

  @Prop({ required: true })
  noticeTitle: string;

  @Prop({ required: true })
  noticeBody: string;

  @Prop({ enum: NoticeType, required: true })
  noticeType: NoticeType;

  @Prop()
  noticeImage?: string; // optional
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
