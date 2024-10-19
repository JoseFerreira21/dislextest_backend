import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioIzquierdaDerecha } from './entities/diccionario_izquierda_derecha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioIzquierdaDerecha])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioIzquierdaDerechaModule {}
