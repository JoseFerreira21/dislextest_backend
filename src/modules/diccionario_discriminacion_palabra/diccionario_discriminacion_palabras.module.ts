import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioDiscriminacionPalabras } from './entities/diccionario_discriminacion_palabras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioDiscriminacionPalabras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioDiscriminacionPalabraModule {}
