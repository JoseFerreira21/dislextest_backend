import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { InstitucionController } from './controller/institucion.controller';
import { InstitucionService } from './service/institucion.service';
import { Instituciones } from './entities/institucion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumnos, Instituciones]),
  ],
  controllers: [InstitucionController],
  providers: [InstitucionService],
  exports: [InstitucionService],
})
export class InstitucionModule {}
