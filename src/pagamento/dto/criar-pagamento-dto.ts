import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CriarPagamentoDto {
  @IsNotEmpty()
  @IsNumber()
  reservaId: number;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsDate()
  dataPagamento: Date;

  @IsNotEmpty()
  @IsString()
  metodoPagamento: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
