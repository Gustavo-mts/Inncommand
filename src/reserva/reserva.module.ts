import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { ReservaSchema } from './interfaces/reserva.schema';
import { QuartoModule } from '../quarto/quarto.module';
import { UserModule } from '../user/user.module';
import { QuartoService } from 'src/quarto/quarto.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reserva', schema: ReservaSchema }]),
    QuartoModule,
    UserModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}