import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'pg';

import { Entidades } from '../entities/entidades.entity';
//import { AlumnoService } from 'src/modules/alumno/service/alumno.service';
import { Usuarios } from 'src/modules/usuario/entities/usuarios.entity';
import { CreateEntidadDto, UpdateEntidadDto } from '../dtos/entidad.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class EntidadService {
  constructor(
    @InjectRepository(Entidades) private entidadRepository: Repository<Entidades>,
    @InjectRepository(Usuarios) private usuariosRepository: Repository<Usuarios>,
    @Inject('PG') private clientPg: Client,
    //private alumnoRepository : AlumnoService,
    ) {}

  findAll() {
    return this.entidadRepository.find();
  }

  async findOne(id: number) : Promise<Entidades>{
    const entidad = await this.entidadRepository.findOne(id,{ where: { id: id } });
    if (!entidad) {
      throw new NotFoundException(`Entidad #${id} no existe`);
    }
    return entidad;
  }
  
  findOneUserId(id: number){
    return new Promise((resolve, reject) => {
      this.clientPg.query( `select *
                             from entidades e
                            where 1 = 1
                              and e."usuarioId" = ${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  async create(data: CreateEntidadDto) {
    const newEntidad = await this.entidadRepository.create(data);
    if (data.usuarioId) {
      const usuario = await this.usuariosRepository.findOne(data.usuarioId);
      newEntidad.usuario = usuario; //relación uno a uno
    }
    return this.entidadRepository.save(newEntidad);
  }

  async update(id: number, changes: UpdateEntidadDto) {
    const entidad = await this.entidadRepository.findOne({ where: { id: id } });
    if (!entidad) {
      throw new NotFoundException(`Entidad #${id} no existe`);
    }
    this.entidadRepository.merge(entidad, changes);
    return this.entidadRepository.save(entidad);
  }

  async remove(id: number) {
    const index = await this.entidadRepository.findOne({ where: { id: id } });
    if (!index) {
      throw new NotFoundException(`Entidad #${id} no existe`);
    }
    return this.entidadRepository.remove(index);
  }
}
