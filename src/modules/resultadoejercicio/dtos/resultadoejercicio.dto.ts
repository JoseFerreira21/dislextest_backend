import { IsString, IsNumber, IsNotEmpty, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

export class CreateResultadosEjercicioDto {
  @ApiProperty({ type: [CreateResultadoEjercicioDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResultadoEjercicioDto)
  resultados: CreateResultadoEjercicioDto[];
}

export class UpdateResultadoEjercicioDto extends PartialType(CreateResultadoEjercicioDto) {}
