import * as mongoose from 'mongoose';

export const QuartoSchema = new mongoose.Schema({
  hotelId: { type: Number, required: true },
  tipo: { type: String, required: true },
  precoPorNoite: { type: Number, required: true },
  descricao: { type: String, required: true },
  disponivel: { type: Boolean, required: true, default: true },
});
