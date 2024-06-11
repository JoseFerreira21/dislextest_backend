import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateResultadoEjercicioDto {
  @ApiProperty()
  @IsString()
  "respuestaRespondida": string;

  @ApiProperty()
  @IsBoolean()
  acierto: boolean;

  @ApiProperty()
  @IsNumber()
  "ejercicioId": number;

  @ApiProperty()
  @IsNumber()
  "ejercicioOpcionesId": number;

  @ApiProperty()
  @IsNumber()
  "alumnoId": number;

  @ApiProperty()
  @IsNumber()
  "resultadoItemId": number;
}

export class UpdateResultadoEjercicioDto extends PartialType(CreateResultadoEjercicioDto) {}