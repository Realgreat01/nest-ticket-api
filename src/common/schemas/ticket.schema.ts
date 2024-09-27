import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
// import { User } from './user.schema';

@Schema({ timestamps: true })
export class Ticket extends mongoose.Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: User.name,
  })
  created_by: User;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, enum: ['low', 'medium', 'high'], required: true })
  priority: 'low' | 'medium' | 'high';

  @Prop({ type: Date, required: true })
  expiry_date: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
