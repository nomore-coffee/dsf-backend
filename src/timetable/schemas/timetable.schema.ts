import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class SubjectTime {
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  from: string; // e.g. '09:00'
  @Prop({ required: true })
  to: string;   // e.g. '10:00'
}

@Schema()
export class Timetable extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  timetableFor: string;

  @Prop({ required: true })
  timeTableDate: Date;

  @Prop({ default: Date.now })
  creationDate: Date;

  @Prop({ type: [Object] })
  subjects: SubjectTime[];
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable); 