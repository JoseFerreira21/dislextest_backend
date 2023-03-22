import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntidadController } from './controller/entidad.controller';
import { EntidadService } from './service/entidad.service';
import { Entidades } from './entities/entidades.entity';
import { Usuarios } from '../usuario/entities/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entidades, Usuarios])], 
  controllers: [EntidadController],
  providers: [EntidadService],
  exports: [EntidadService],
})
export class EntidadModule {}
