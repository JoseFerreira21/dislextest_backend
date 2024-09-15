import { IsNotEmpty, IsNumber, IsPositive , IsArray, IsString} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  
  @IsString()
  @ApiProperty({ description: `Grado del alumno` })
  grado: string;

  @IsNumber()
  @ApiProperty({ description: `Año` })
  año: number;

  @IsString()
  @ApiProperty({ description: `Institución a donde cursa` })
  institucion: string;

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
