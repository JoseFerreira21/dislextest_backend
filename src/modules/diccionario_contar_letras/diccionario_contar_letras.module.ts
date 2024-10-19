import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioContarLetras } from './entities/diccionario_contar_letras.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioContarLetras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioContarLetrasModule {}
