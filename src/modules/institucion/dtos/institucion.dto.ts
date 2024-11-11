import {
    IsString,
    IsNotEmpty,
  
  } from 'class-validator';
  import { PartialType, ApiProperty } from '@nestjs/swagger';
  
  export class CreateInstitucionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipo: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    direccion: string;


  }
  
  export class UpdateInstitucionDto extends PartialType(CreateInstitucionDto) {}
  