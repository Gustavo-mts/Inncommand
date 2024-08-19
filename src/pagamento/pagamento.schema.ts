import mongoose from 'mongoose';

export const PagamentoSchema = new mongoose.Schema({
  reservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' },
  valor: { type: Number, required: true },
  dataPagamento: { type: Date, required: true },
  metodoPagamento: { type: String, required: true },
  status: { type: String, required: true },
});
