import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './reserva.interface';
import { Model } from 'mongoose';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel('Reserva') private readonly reservaModel: Model<Reserva>,
  ) {}

  async verificarDisponibilidade(
    quartoId: string,
    dataCheckIn: Date,
    dataCheckOut: Date,
  ): Promise<boolean> {
    const reservas = await this.reservaModel.find({
      quartoId,
      $or: [
        {
          dataCheckIn: { $lte: dataCheckOut },
          dataCheckOut: { $gte: dataCheckIn },
        },
      ],
    });
    return reservas.length === 0;
  }

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const disponivel = await this.verificarDisponibilidade(
      createReservaDto.room,
      createReservaDto.startDate,
      createReservaDto.endDate,
    );

    if (!disponivel) {
      throw new ConflictException(
        'O quarto não está disponível para as datas selecionadas.',
      );
    }
    const novaReserva = new this.reservaModel(createReservaDto);
    return await novaReserva.save();
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaModel.find().exec();
  }

  async findOne(id: string): Promise<Reserva> {
    const reserva = await this.reservaModel.findById(id).exec();
    if (!reserva) {
      throw new NotFoundException(`Reserva com o ID ${id} não encontrado.`);
    }
    return reserva;
  }

  async update(
    id: string,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    const reserva = await this.reservaModel.findByIdAndUpdate(
      id,
      updateReservaDto,
    );
    if (!reserva) {
      throw new NotFoundException(`Reserva com o ID ${id} não encontrado`);
    }
    return reserva;
  }

  async delete(id: string): Promise<void> {
    const result = await this.reservaModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Reserva com o ID ${id} não encontrado`);
    }
  }
}
