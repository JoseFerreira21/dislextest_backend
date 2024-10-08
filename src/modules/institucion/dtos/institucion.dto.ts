import {
    IsString,
    IsNotEmpty,
  
  } from 'class-validator';
  import { PartialType, ApiProperty } from '@nestjs/swagger';
  
  export class CreateInstitucionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
  }
  
  export class UpdateInstitucionDto extends PartialType(CreateInstitucionDto) {}
  