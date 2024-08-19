import * as mongoose from 'mongoose';

export const QuartoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  precoPorNoite: { type: Number, required: true },
  descricao: { type: String, required: true },
  disponivel: { type: Boolean, required: true, default: true },
});
