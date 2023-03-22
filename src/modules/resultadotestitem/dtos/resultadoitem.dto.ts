import { IsString, Length, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateResultadoItemDto {
  @ApiProperty({description: 'puntaje obtenido'})
  @IsNumber()
  "pObtenido": number;

  @ApiProperty({description: 'indicador'})
  @IsString()
  indicador: string;
  
  @ApiProperty({description: 'observacion'})
  @IsString()
  observacion: string;

  @ApiProperty({description: 'id del area'})
  @IsNumber()
  readonly AreaId: number;

  @ApiProperty({description: 'id del resultado test'})
  @IsNumber()
  readonly ResultadoTestId: number;
}

export class UpdateResultadoItemDto extends PartialType(CreateResultadoItemDto) {}
