import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { ReservaSchema } from './reserva.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reserva', schema: ReservaSchema }]),
  ],
  providers: [ReservaService],
  controllers: [ReservaController],
})
export class ReservaModule {}
