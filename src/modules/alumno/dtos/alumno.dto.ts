import { IsNotEmpty, IsNumber, IsPositive , IsArray} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class CreateAlumnoDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  entidadId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly profesorId: number[];

}

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {}
