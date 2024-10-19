import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncerrarSilabasCf } from './entities/diccionario_encerrar_silaba_cf.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncerrarSilabasCf])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncerrarSilabasCfModule {}
