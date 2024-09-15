import { Document } from 'mongoose';

export interface Reserva extends Document {
  readonly quartoId: string;
  readonly userId: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
