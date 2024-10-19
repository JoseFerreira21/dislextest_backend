import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { GradoController } from './controller/grado.controller';
import { GradoService } from './service/grado.service';
import { Grados } from './entities/grado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alumnos, Grados]),
  ],
  controllers: [GradoController],
  providers: [GradoService],
  exports: [GradoService],
})
export class GradoModule {}
