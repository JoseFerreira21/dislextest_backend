import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfesorController } from './controller/profesor.controller';
import { ProfesorService } from './service/profesor.service';
import { Profesores } from './entities/profesores.entity';

import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { EntidadService } from '../entidad/service/entidad.service';
import { EntidadController } from '../entidad/controller/entidad.controller';

import { ResultadoTest } from '../resultadotest/entities/resultadotest.entity';
import { Alumnos } from '../alumno/entities/alumnos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesores, Entidades, ResultadoTest, Alumnos]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [ProfesorService],
})
export class ProfesorModule {}
