import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateReservaDto {
  @IsOptional()
  @IsMongoId()
  readonly quartoId?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @IsOptional()
  @IsDateString()
  readonly startDate?: Date;

  @IsOptional()
  @IsDateString()
  readonly endDate?: Date;
}
