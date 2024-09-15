import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuartoDto } from './dto/create-quarto.dto';
import { UpdateQuartoDto } from './dto/update-quarto.dto';
import { Quarto } from './interfaces/quarto.interface';

@Injectable()
export class QuartoService {
  constructor(
    @InjectModel('Quarto') private readonly quartoModel: Model<Quarto>,
  ) {}

  async create(createQuartoDto: CreateQuartoDto): Promise<Quarto> {
    // Utilizar o método create do modelo para criar uma nova instância
    return this.quartoModel.create(createQuartoDto);
  }

  async findAll(): Promise<Quarto[]> {
    return this.quartoModel.find();
  }

  async findOne(id: string): Promise<Quarto> {
    const quarto = await this.quartoModel.findById(id);
    if (!quarto) {
      throw new NotFoundException(`Quarto with ID ${id} not found`);
    }
    return quarto;
  }

  async update(id: string, updateQuartoDto: UpdateQuartoDto): Promise<Quarto> {
    const updatedQuarto = await this.quartoModel.findByIdAndUpdate(id, updateQuartoDto, { new: true });
    if (!updatedQuarto) {
      throw new NotFoundException(`Quarto with ID ${id} not found`);
    }
    return updatedQuarto;
  }

  async remove(id: string): Promise<Quarto> {
    const deletedQuarto = await this.quartoModel.findByIdAndDelete(id);
    if (!deletedQuarto) {
      throw new NotFoundException(`Quarto with ID ${id} not found`);
    }
    return deletedQuarto;
  }
}
