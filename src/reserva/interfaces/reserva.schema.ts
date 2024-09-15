import { Schema } from 'mongoose';

export const ReservaSchema = new Schema({
  quartoId: { type: Schema.Types.ObjectId, ref: 'Quarto', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Atualiza o campo updatedAt quando um documento é atualizado
ReservaSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
