import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncontrarLetras } from './entities/diccionario_encontrar_letras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncontrarLetras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncontrarLetrasModule {}
