import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
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
