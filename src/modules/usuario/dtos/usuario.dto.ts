import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/models/roles.model';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString({message: 'No es string'})
  @IsEnum(Role, {message: 'Rol no válido'})
  role : Role;

}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
