import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './interfaces/reserva.interface';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reserva> {
    return this.reservaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    return this.reservaService.update(id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Reserva> {
    return this.reservaService.remove(id);
  }
}