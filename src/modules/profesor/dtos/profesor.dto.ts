import {
  IsString,
  IsNumber,
  IsArray,
  IsNotEmpty,
  
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProfesorDto {
  
  @IsNumber()
  @ApiProperty({ description: `id entidad` })
  readonly entidadId: number;

}

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {}