import {
    IsString,
    IsNotEmpty,
  
  } from 'class-validator';
  import { PartialType, ApiProperty } from '@nestjs/swagger';
  
  export class CreateGradoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
  }
  
  export class UpdateGradoDto extends PartialType(CreateGradoDto) {}
  