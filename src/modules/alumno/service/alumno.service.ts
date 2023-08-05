import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Alumnos } from '../entities/alumnos.entity';
import { CreateAlumnoDto, UpdateAlumnoDto } from '../dtos/alumno.dto';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { Client } from 'pg';

import { ApiTags } from '@nestjs/swagger';
import { Profesores } from 'src/modules/profesor/entities/profesores.entity';

@ApiTags()
@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumnos) private alumnoRepository: Repository<Alumnos>,
    @InjectRepository(Entidades) private entidadRepository: Repository<Entidades>,
    @InjectRepository(Profesores) private profesorRepository: Repository<Profesores>,
    @Inject('PG') private clientPg: Client,
  ) {}

  /*findAll() {
    return this.alumnoRepository.find();
  }*/

  async findOne(id: number): Promise<Alumnos> {
    const alumno = await this.alumnoRepository.findOne(id, {
      relations: ['entidad', 'profesor'],
      where: { id: id },
    });
    if (!alumno) {
      throw new NotFoundException(`Alumno #${id} no existe`);
    }
    return alumno;
  }

  async create(data: CreateAlumnoDto) {
    const newAlumno = this.alumnoRepository.create(data);

    if (data.entidadId) {
      const entidad = await this.entidadRepository.findOne(data.entidadId);
      newAlumno.entidad = entidad; //relación uno a uno
    }
    
    if (data.profesorId) {
      const profesor = await this.profesorRepository.find({
        id: In(data.profesorId),
      });
      newAlumno.profesor = profesor; //relación muchos a muchos
    }

    return this.alumnoRepository.save(newAlumno);
  }

  async update(id: number, changes: UpdateAlumnoDto) {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    if (!alumno) {
      throw new NotFoundException(`Alumno #${id} no existe`);
    }
    this.alumnoRepository.merge(alumno, changes);
    return this.alumnoRepository.save(alumno);
  }

  async remove(id: number) {
    const index = await this.alumnoRepository.findOne({ where: { id: id } });
    if (!index) {
      throw new NotFoundException(`Alumno #${id} no existe`);
    }
    return this.alumnoRepository.remove(index);
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT a.id,
                (((e."nombre") ::text || ' ' ::text) || (e."apellido") ::text) AS nombreAlumno,
                date_part('year', now()) - date_part('year', e."fechaNacimiento") ||
                ' años' as edad,
                e."direccion",
                e."nroDocumento" ci
          FROM alumnos a, entidades e
          WHERE 1 = 1
            and a."entidadId" = e.id
            and e."tipoEntidad" = 'AL'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }
  /*
  finOneById(id: number) { // 👈 new method
    return new Promise((resolve, reject) => {
      this.clientPg.query(`SELECT * FROM alumno WHERE id = #${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
  */
}
