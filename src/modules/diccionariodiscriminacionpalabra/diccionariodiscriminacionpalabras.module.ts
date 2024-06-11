import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioDiscriminacionPalabras } from './entities/diccionariodiscriminacionpalabras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioDiscriminacionPalabras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioDiscriminacionPalabraModule {}
