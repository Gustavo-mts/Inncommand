import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QuartoService } from './quarto.service';
import { CreateQuartoDto } from './dto/create-quarto-dto';
import { UpdateQuartoDto } from './dto/update-quarto-dto';

@Controller('quarto')
export class QuartoController {
  constructor(private readonly quartoService: QuartoService) {}

  @Post()
  async create(@Body() createQuartoDto: CreateQuartoDto) {
    const user = await this.quartoService.create(createQuartoDto);
    return user;
  }

  @Get()
  async findAll() {
    const user = await this.quartoService.findAll();
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.quartoService.findOne(id);
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuartoDto: UpdateQuartoDto,
  ) {
    const user = await this.quartoService.update(id, updateQuartoDto);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param(':id') id: string) {
    await this.quartoService.delete(id);
    return null;
  }
}
