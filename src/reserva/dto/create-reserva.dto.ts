import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateReservaDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly room: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;

  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice: number;

  @IsEnum(['reserved', 'cancelled', 'completed'])
  @IsNotEmpty()
  readonly status: string;
}
