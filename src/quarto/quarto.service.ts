import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Quarto } from './quarto.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuartoDto } from './dto/create-quarto-dto';
import { UpdateQuartoDto } from './dto/update-quarto-dto';

@Injectable()
export class QuartoService {
  constructor(
    @InjectModel('Quarto') private readonly quartoModel: Model<Quarto>,
  ) {}

  async create(createQuartoDto: CreateQuartoDto): Promise<Quarto> {
    const novoQuarto = new this.quartoModel(createQuartoDto);
    return await novoQuarto.save();
  }

  async findAll(): Promise<Quarto[]> {
    return await this.quartoModel.find().exec();
  }

  async findOne(id: string): Promise<Quarto> {
    const quarto = await this.quartoModel.findById(id).exec();
    if (!quarto) {
      throw new NotFoundException(`Quarto com o ID ${id} não encontrado.`);
    }
    return quarto;
  }

  async update(id: string, updateQuartoDto: UpdateQuartoDto): Promise<Quarto> {
    const quarto = await this.quartoModel.findByIdAndUpdate(
      id,
      updateQuartoDto,
    );
    if (!quarto) {
      throw new NotFoundException(`Quarto com ID ${id} não encontrado.`);
    }
    return quarto;
  }

  async delete(id: string): Promise<void> {
    const result = await this.quartoModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Quarto com ID ${id} não encontrado.`);
    }
  }
}
