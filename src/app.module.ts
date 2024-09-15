import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ReservaModule } from './reserva/reserva.module';
import { QuartoModule } from './quarto/quarto.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilitar variáveis de ambiente
    MongooseModule.forRoot(process.env.DATABASE_URL), // Conexão com o banco de dados
    UserModule,
    ReservaModule,
    QuartoModule,
  ],
})
export class AppModule {}
