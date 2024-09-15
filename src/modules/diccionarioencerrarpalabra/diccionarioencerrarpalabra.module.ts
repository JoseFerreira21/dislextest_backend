import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncerrarPalabras } from './entities/diccionarioencerrarpalabra.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncerrarPalabras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncerrarPalabraModule {}
