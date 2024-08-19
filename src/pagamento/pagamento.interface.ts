import { Document } from 'mongoose';

export interface Pagamento extends Document {
  id: number;
  reservaId: number;
  valor: number;
  dataPagamento: Date;
  metodoPagamento: string;
  status: string;
}
