import { IsString, Length, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateResultadotestDto {
  @ApiProperty({description: 'indicador test'})
  @IsString()
  indicador: string;

  @ApiProperty({description: 'observacion'})
  @IsString()
  observacion: string;

  @ApiProperty({description: 'tiempo total empleado en el test'})
  @IsNumber()
  tiempoTotal: number;

  @ApiProperty({description: 'id del alumno'})
  @IsNumber()
  readonly alumnoId: number;

  @ApiProperty({description: 'id del profesor'})
  @IsNumber()
  readonly profesorId: number;
}

export class UpdateResultadotestDto extends PartialType(CreateResultadotestDto) {}