import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuarios } from '../entities/usuarios.entity';
import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
} from '../dtos/usuario.dto';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { Client } from 'pg';

import * as bcrypt from 'bcrypt';

import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
    @InjectRepository(Entidades) private entidadesRepository: Repository<Entidades>,
  ) {}

  findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuariosRepository.findOne(id, {
      relations: ['entidad'],
      where: { id: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${id} no existe`);
    }
    return usuario;
  }

  async findByMail(email: string) {
    //console.log('Imprimiendo en service')
    //console.log(email);
    return await this.usuariosRepository.findOne({
      where: { email: email },
    });
  }

  async create(data: CreateUsuarioDto) {
    const newusuario = this.usuariosRepository.create(data);
    const hashPassword = await bcrypt.hash(newusuario.password, 10);
    newusuario.password = hashPassword;

    /*if (data.entidadId) {
      const entidad = await this.entidadRepository.findOne(data.entidadId);
      newusuario.entidad = entidad; //relación uno a uno
    }*/ //Pasar a servicio de entidad

    return this.usuariosRepository.save(newusuario);
  }

  async update(id: number, changes: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${id} no existe`);
    }
    this.usuariosRepository.merge(usuario, changes);
    return this.usuariosRepository.save(usuario);
  }

  async remove(id: number) {
    const index = await this.usuariosRepository.findOne({
      where: { id: id },
    });
    if (!index) {
      throw new NotFoundException(`Usuario #${id} no existe`);
    }
    return this.usuariosRepository.remove(index);
  }
}
