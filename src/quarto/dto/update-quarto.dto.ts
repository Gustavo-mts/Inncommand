import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateQuartoDto {
  @IsOptional()
  @IsString()
  readonly number?: string;

  @IsOptional()
  @IsString()
  readonly type?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsBoolean()
  readonly available?: boolean;
}
