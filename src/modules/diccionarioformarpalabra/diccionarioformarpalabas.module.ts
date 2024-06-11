import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioFormarPalabras } from './entities/diccionarioformarpalabras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioFormarPalabras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioFormarPalabrasModule {}
