import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncontrarLetras } from './entities/diccionarioencontrarletras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncontrarLetras])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncontrarLetrasModule {}
