import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class Org extends Document {
 
  @Prop()
  orgID: string;

  @Prop({ required: true })
  orgName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  })
  orgEmail: string;

  @Prop({ required: true })
  orgPassword: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  orgOwner: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const OrgSchema = SchemaFactory.createForClass(Org);

// Pre-save hook for hashing password
OrgSchema.pre<Org>('save', async function (next) {
  if (!this.isModified('orgPassword')) return next(); // skip if not modified

  const salt = await bcrypt.genSalt(10);
  this.orgPassword = await bcrypt.hash(this.orgPassword, salt);
  next();
});

//Compare
// OrgSchema.methods.comparePassword = async function (plain: string): Promise<boolean> {
//   return bcrypt.compare(plain, this.orgPassword);
// };
