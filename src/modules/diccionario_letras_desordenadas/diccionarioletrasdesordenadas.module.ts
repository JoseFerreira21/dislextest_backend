import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioLetrasDesordenadas } from './entities/diccionarioletrasdesordenadas.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioLetrasDesordenadas])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioLetrasDesordenadasModule {}
