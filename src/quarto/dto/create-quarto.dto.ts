import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateQuartoDto {
  @IsString()
  readonly number: string;

  @IsString()
  readonly type: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsBoolean()
  @IsOptional()
  readonly available?: boolean;
}
