import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsPositive,
  IsDateString,
  IsIn,
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
  @IsIn(['M', 'F'])
  sexo: string;

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
  @IsNumber()
  @IsOptional()
  usuarioId: number;
}

export class UpdateEntidadDto extends PartialType(CreateEntidadDto) {}
