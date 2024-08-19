import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, requered: true },
  senha: { type: String, required: true },
  telefone: { type: String, required: false },
  endereco: { type: String, required: false },
});
