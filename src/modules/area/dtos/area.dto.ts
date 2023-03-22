import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  "pEsperado": number;

}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {}