import { Document } from 'mongoose';

export interface User extends Document {
  readonly nome: string;
  readonly email: string;
  readonly senha: string;
  readonly telefone: string;
  readonly endereco: string;
}
