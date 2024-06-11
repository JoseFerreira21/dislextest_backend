import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoEjercicios } from './entities/resultadoejercicio.entity';
import { ResultadoEjercicioController } from './controller/resultadoejercicio.controller';
import { ResultadoEjercicioService } from './service/resultadoejercicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEjercicios])], 
  controllers: [ResultadoEjercicioController],
  providers: [ResultadoEjercicioService],
  exports: [ResultadoEjercicioService],
})

export class ResultadoEjercicioModule {}
