import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlumnoController } from '../alumno/controller/alumno.controller';
import { AlumnoService } from '../alumno/service/alumno.service';
import { Alumnos } from './entities/alumnos.entity';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { ResultadoTest } from '../resultadotest/entities/resultadotest.entity';
import { Profesores } from '../profesor/entities/profesores.entity';
import { Grados } from '../grado/entities/grado.entity';
import { Instituciones } from '../institucion/entities/institucion.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Alumnos, Entidades, Profesores, ResultadoTest, Grados, Instituciones]),
  ],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService],
})
export class AlumnoModule {}
