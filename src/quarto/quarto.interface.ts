import { Document } from 'mongoose';

export interface Quarto extends Document {
  id: number;
  tipo: string;
  precoPorNoite: number;
  descricao: string;
  disponivel: boolean;
}
