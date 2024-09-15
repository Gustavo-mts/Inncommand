import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './interfaces/reserva.interface';
import { QuartoService } from '../quarto/quarto.service';
import { UserService } from '../user/user.service'; 

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel('Reserva') private readonly reservaModel: Model<Reserva>,
    private readonly quartoService: QuartoService,
    private readonly userService: UserService
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { quartoId, userId, startDate, endDate } = createReservaDto;
  
    // Verificar se o quarto existe e está disponível
    const quarto = await this.quartoService.findOne(quartoId);
    if (!quarto) {
      throw new NotFoundException(`Room with ID ${quartoId} not found`);
    }
  
    // Verificar se o usuário existe
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // Verificar se o quarto está disponível para as datas selecionadas
    const existingReserva = await this.reservaModel.find({
      quartoId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });
  
    if (existingReserva.length > 0) {
      throw new NotFoundException(`Room with ID ${quartoId} is already reserved for the selected dates`);
    }
  
    return this.reservaModel.create(createReservaDto);
  }  

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.find();
  }

  async findOne(id: string): Promise<Reserva> {
    const reserva = await this.reservaModel.findById(id);
    if (!reserva) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }
    return reserva;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const updatedReserva = await this.reservaModel.findByIdAndUpdate(id, updateReservaDto, { new: true });
    if (!updatedReserva) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }
    return updatedReserva;
  }

  async remove(id: string): Promise<Reserva> {
    const deletedReserva = await this.reservaModel.findByIdAndDelete(id);
    if (!deletedReserva) {
      throw new NotFoundException(`Reserva with ID ${id} not found`);
    }
    return deletedReserva;
  }
}