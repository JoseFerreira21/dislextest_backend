import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsPositive,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEntidadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tipoEntidad: string;

  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  fechaNacimiento: Date;

  @ApiProperty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsString()
  nroDocumento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  usuarioId: number;
}

export class UpdateEntidadDto extends PartialType(CreateEntidadDto) {}
