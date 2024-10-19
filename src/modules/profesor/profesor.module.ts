import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfesorController } from './controller/profesor.controller';
import { ProfesorService } from './service/profesor.service';
import { Profesores } from './entities/profesores.entity';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { ResultadoTest } from '../resultado_test/entities/resultado_test.entity';
import { Alumnos } from '../alumno/entities/alumnos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesores, Entidades, Alumnos, ResultadoTest]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [ProfesorService],
})
export class ProfesorModule {}
