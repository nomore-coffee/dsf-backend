import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Subject {
  ENGLISH = 'english',
  MATH = 'math',
  SCIENCE = 'science',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  ALGEBRA = 'algebra',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  HINDI = 'hindi',
  MARATHI = 'marathi',
  SANSKRIT = 'sanskrit',
}

@Schema({ timestamps: true })
export class Material extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Org', required: true })
  orgID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userID: Types.ObjectId;

  @Prop({ required: true })
  forClass: number;

  @Prop({ required: true })
  materialTitle: string;

  @Prop({ required: true })
  materialUrl: string;

  @Prop({ enum: Subject, required: true })
  materialSubject: Subject;
 
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
