import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('bookings')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body() createBookingDto: CreateReservaDto) {
    const booking = await this.reservaService.create(createBookingDto);
    console.log(booking);
    return booking;
  }

  @Get()
  async findAll() {
    const bookings = await this.reservaService.findAll();
    return bookings;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await this.reservaService.findOne(id);
    return booking;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    const booking = await this.reservaService.update(id, updateReservaDto);
    return booking;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.reservaService.delete(id);
    return null;
  }
}
