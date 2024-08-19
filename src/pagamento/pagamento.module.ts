import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PagamentoSchema } from './pagamento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pagamento', schema: PagamentoSchema }]),
  ],
  providers: [PagamentoService],
  controllers: [PagamentoController],
})
export class PagamentoModule {}
