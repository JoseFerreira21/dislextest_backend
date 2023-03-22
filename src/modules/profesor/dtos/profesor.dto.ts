import {
  IsString,
  IsNumber,
  IsArray,
  IsNotEmpty,
  
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProfesorDto {
  @IsString()
  @ApiProperty({ description: `curso profesor` })
  curso: string;

  @IsNumber()
  @ApiProperty({ description: `id entidad` })
  readonly entidadId: number;

  
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly alumnosIds: number[];


}

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {}