import { Document } from 'mongoose';

export interface Reserva extends Document {
  readonly room: string;
  readonly user: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly totalPrice: number;
  readonly status: ReservaStatus;
}

export enum ReservaStatus {
  RESERVED = 'reserved',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}
