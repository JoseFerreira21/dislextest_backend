import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncerrarPalabras } from './entities/diccionario_encerrar_palabra.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncerrarPalabras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncerrarPalabraModule {}
