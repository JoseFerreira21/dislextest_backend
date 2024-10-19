import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoEjercicios } from './entities/resultado_ejercicio.entity';
import { ResultadoEjercicioController } from './controller/resultado_ejercicio.controller';
import { ResultadoEjercicioService } from './service/resultado_ejercicio.service';
import { Ejercicios } from '../ejercicio/entities/ejercicios.entity';
import { EjerciciosOpciones } from '../ejercicio_opcion/entities/ejercicio_opcion.entity';
import { Alumnos } from '../alumno/entities/alumnos.entity';
import { ResultadoItem } from '../resultado_test_item/entities/resultado_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoEjercicios, Ejercicios, EjerciciosOpciones, Alumnos, ResultadoItem])], 
  controllers: [ResultadoEjercicioController],
  providers: [ResultadoEjercicioService],
  exports: [ResultadoEjercicioService],
})

export class ResultadoEjercicioModule {}
