import { Document } from 'mongoose';

export interface Quarto extends Document {
  readonly number: string;
  readonly type: string;
  readonly description?: string;
  readonly price: number;
  readonly available: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
