import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlumnoController } from '../alumno/controller/alumno.controller';
import { AlumnoService } from '../alumno/service/alumno.service';
import { Alumnos } from './entities/alumnos.entity';

import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { EntidadService } from '../entidad/service/entidad.service';
import { EntidadController } from '../entidad/controller/entidad.controller';

import { ResultadoTest } from '../resultadotest/entities/resultadotest.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Alumnos, Entidades, ResultadoTest])], 
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService],
})
export class AlumnoModule {}
