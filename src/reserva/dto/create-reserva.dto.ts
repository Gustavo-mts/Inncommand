import { IsDateString, IsMongoId } from 'class-validator';

export class CreateReservaDto {
  @IsMongoId()
  readonly quartoId: string;

  @IsMongoId()
  readonly userId: string;

  @IsDateString()
  readonly startDate: Date;

  @IsDateString()
  readonly endDate: Date;
}
