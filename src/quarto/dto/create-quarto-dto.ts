import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateQuartoDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly hotel: string;

  @IsString()
  @IsNotEmpty()
  readonly tipo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly precoPorNoite: string;

  @IsString()
  readonly descricao: string;

  @IsBoolean()
  readonly disponnivel: boolean;
}
