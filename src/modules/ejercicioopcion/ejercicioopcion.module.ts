import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjerciciosOpciones } from './entities/ejercicioopcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EjerciciosOpciones])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class EjercicioOpcionModule {}
