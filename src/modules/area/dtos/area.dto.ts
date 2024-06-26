import { IsString, IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  "pEsperado": number;

  @ApiProperty()
  @IsDecimal()
  'pMinimo': number;

  @ApiProperty()
  @IsString()
  'observacionSR': string;

  @ApiProperty()
  @IsString()
  'observacionR': string;

}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}