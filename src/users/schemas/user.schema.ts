import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

@Schema()
export class User extends Document {
  @Prop()
  userID: string;

  @Prop({ required: true })
  userName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  })
  userEmail: string;

  @Prop({ required: true })
  userPassword: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true })
  orgID: Types.ObjectId;

  @Prop({required:true})
  userClass:Number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ enum: UserRole, required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('userPassword')) return next(); // skip if not modified

  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
});
