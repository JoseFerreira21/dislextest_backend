import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoEjercicios } from './entities/resultadoejercicio.entity';
import { ResultadoEjercicioController } from './controller/resultadoejercicio.controller';
import { ResultadoEjercicioService } from './service/resultadoejercicio.service';
import { Ejercicios } from '../ejercicio/entities/ejercicios.entity';
import { EjerciciosOpciones } from '../ejercicioopcion/entities/ejercicioopcion.entity';
import { Alumnos } from '../alumno/entities/alumnos.entity';
import { ResultadoItem } from '../resultadotestitem/entities/resultadoitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEjercicios, Ejercicios, EjerciciosOpciones, Alumnos, ResultadoItem])], 
  controllers: [ResultadoEjercicioController],
  providers: [ResultadoEjercicioService],
  exports: [ResultadoEjercicioService],
})

export class ResultadoEjercicioModule {}
