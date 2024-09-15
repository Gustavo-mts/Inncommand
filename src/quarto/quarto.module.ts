import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuartoService } from './quarto.service';
import { QuartoController } from './quarto.controller';
import { QuartoSchema } from './interfaces/quarto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quarto', schema: QuartoSchema }]),
  ],
  controllers: [QuartoController],
  providers: [QuartoService],
  exports: [QuartoService]
})
export class QuartoModule {}
