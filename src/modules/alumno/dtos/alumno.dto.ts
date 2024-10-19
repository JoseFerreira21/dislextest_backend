import { IsNotEmpty, IsNumber, IsPositive , IsArray, IsString} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  
  @ApiProperty({ description: `Grado del alumno` })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  gradoId: number;

  @ApiProperty({ description: `Año` })
  @IsNumber()
  @IsPositive()
  año: number;

  @ApiProperty({ description: `Institución a donde cursa` })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  institucionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  entidadId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  profesorId: number;

}

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {}
