import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  entidadId: number;
}

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {}
