import { Schema } from 'mongoose';

export const QuartoSchema = new Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
