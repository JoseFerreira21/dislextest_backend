import {
    IsEmail,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UsuarioEmailDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
  }
  
