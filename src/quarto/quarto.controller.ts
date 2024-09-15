import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { QuartoService } from './quarto.service';
import { CreateQuartoDto } from './dto/create-quarto.dto';
import { UpdateQuartoDto } from './dto/update-quarto.dto';
import { Quarto } from './interfaces/quarto.interface';

@Controller('quartos')
export class QuartoController {
  constructor(private readonly quartoService: QuartoService) {}

  @Post()
  create(@Body() createQuartoDto: CreateQuartoDto): Promise<Quarto> {
    return this.quartoService.create(createQuartoDto);
  }

  @Get()
  findAll(): Promise<Quarto[]> {
    return this.quartoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quarto> {
    return this.quartoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuartoDto: UpdateQuartoDto): Promise<Quarto> {
    return this.quartoService.update(id, updateQuartoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Quarto> {
    return this.quartoService.remove(id);
  }
}
