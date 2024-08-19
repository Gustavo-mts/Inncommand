import {
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateQuartoDto {
  @IsOptional()
  @IsInt()
  hotelId?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precoPorNoite?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;
}
