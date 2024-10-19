import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioEncerrarSilabasCs } from './entities/diccionario_encerrar_silaba_cs.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioEncerrarSilabasCs])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioEncerrarSilabasCsModule {}
