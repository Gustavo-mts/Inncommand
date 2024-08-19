import { Module } from '@nestjs/common';
import { QuartoService } from './quarto.service';
import { QuartoController } from './quarto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuartoSchema } from './quarto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quarto', schema: QuartoSchema }]),
  ],
  providers: [QuartoService],
  controllers: [QuartoController],
})
export class QuartoModule {}
