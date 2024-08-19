import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pagamento } from './pagamento.interface';
import { Model } from 'mongoose';
import { CriarPagamentoDto } from './dto/criar-pagamento-dto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectModel('Pagamento') private readonly pagamentoModel: Model<Pagamento>,
  ) {}

  async create(criarPagamentoDto: CriarPagamentoDto): Promise<Pagamento> {
    const novoUsuario = new this.pagamentoModel(criarPagamentoDto);
    return await novoUsuario.save();
  }
}
