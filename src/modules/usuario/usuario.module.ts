import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuarios } from './entities/usuarios.entity';
import { UserProfileController } from './controller/usuario.controller';  
import { UsuarioService } from './service/usuario.service';

import { Entidades } from '../entidad/entities/entidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Entidades])],
  controllers: [UserProfileController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
