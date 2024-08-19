import * as mongoose from 'mongoose';

export const ReservaSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Quarto' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, enum: ['reserved', 'cancelled', 'completed'] },
});
