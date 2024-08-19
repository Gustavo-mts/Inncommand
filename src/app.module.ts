import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservaModule } from './reserva/reserva.module';
import { UsersModule } from './users/users.module';
import { QuartoModule } from './quarto/quarto.module';
import { PagamentoModule } from './pagamento/pagamento.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gustavo:tavinho1@cluster0.8dmtp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ReservaModule,
    UsersModule,
    QuartoModule,
    PagamentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
