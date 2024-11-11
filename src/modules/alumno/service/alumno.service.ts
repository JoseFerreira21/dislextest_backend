import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Alumnos } from '../entities/alumnos.entity';
import { CreateAlumnoDto, UpdateAlumnoDto } from '../dtos/alumno.dto';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { Client } from 'pg';

import { ApiTags } from '@nestjs/swagger';
import { Profesores } from 'src/modules/profesor/entities/profesores.entity';

import { Grados } from 'src/modules/grado/entities/grado.entity';
import { Instituciones } from 'src/modules/institucion/entities/institucion.entity'; 

@ApiTags()
@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumnos) private alumnoRepository: Repository<Alumnos>,
    @InjectRepository(Entidades)
    private entidadRepository: Repository<Entidades>,
    @InjectRepository(Profesores)
    private profesorRepository: Repository<Profesores>,
    @InjectRepository(Grados) private gradoRepository: Repository<Grados>,
    @InjectRepository(Instituciones) private institucionRepository: Repository<Instituciones>,
    @Inject('PG') private clientPg: Client,
  ) {}

  findAll() {
    return this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumnos> {
    const alumno = await this.alumnoRepository.findOne(id, {
      //relations: ['entidad'],
      where: { id: id },
    });
    if (!alumno) {
      throw new NotFoundException(`Alumno #${id} no existe`);
    }
    return alumno;
  }

  async findAlumnoId(id: number): Promise<Alumnos> {
    const alumno = await this.alumnoRepository.findOne(id, {
      where: { entidadId: id },
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
      const profesor = await this.profesorRepository.findOne({
        id: data.profesorId,
      });
      newAlumno.profesor = profesor;
    }

    if (data.gradoId) {
      const grado = await this.gradoRepository.findOne(data.gradoId);
      newAlumno.grado = grado;
    }

    if (data.institucionId) {
      const institucion = await this.institucionRepository.findOne(data.institucionId);
      newAlumno.institucion = institucion;
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

  findAllAlumns() {
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

  findAllByProfesor(idProfesor: number) {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT a.id as "alumnoId",
                e.id,
                e."tipoEntidad", 
                e.nombre, 
                e.apellido, 
                TO_CHAR("fechaNacimiento", 'DD/MM/YYYY') as "fechaNacimiento",
                e.sexo,
                date_part('year', now()) - date_part('year', e."fechaNacimiento") || ' años' as edad,
                e.telefono, 
                e.direccion,
                e."nroDocumento",
                a.año,
                jsonb_build_object(
                  'id', g.id,
                  'nombre', g.descripcion
                ) as grado,
                jsonb_build_object(
                  'id', i.id,
                  'nombre', i.descripcion
                ) as institucion,
                (select case
                  when t.cantidad = 0 then 'N'
                  when t.cantidad = 10 then 'S'
                  else 'P'
                end test
                from (
                  select count(1) as cantidad 
                  from resultado_test rt, resultado_item ri 
                  where rt."alumnoId" = a.id 
                  and rt.id = ri."resultadotestId"
                ) t) as "realizoTest"
          FROM alumnos a
          JOIN entidades e ON a."entidadId" = e.id
          JOIN grados g ON a."gradoId" = g.id
          JOIN instituciones i ON a."institucionId" = i.id
          WHERE a."profesorId" = $1
          AND e."tipoEntidad" = 'AL'
          ORDER BY a.id`,
        [idProfesor],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          if (!res || !res.rows) {
            return reject(
              new Error('Unexpected response format from the database.'),
            );
          }
          resolve(res.rows);
        },
      );
    });
  }

  findAlumnoIdByCI(ci: string) {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT a.id
         FROM alumnos a, entidades e
         WHERE a."entidadId" = e.id
           AND TRIM(e."nroDocumento") = TRIM($1)
           AND e."tipoEntidad" = 'AL'`,
        [ci],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          if (!res || !res.rows) {
            return reject(
              new Error('Unexpected response format from the database.'),
            );
          }
          resolve(res.rows[0]); // Devuelve solo el primer resultado
        },
      );
    });
  }

  findAlumnoIdByEntidadID(EntidadId: number) {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT a.id, a."entidadId", a."profesorId", a."gradoId" , a."institucionId" 
         FROM alumnos a
         WHERE a."entidadId" = $1`,
        [EntidadId],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          if (!res || !res.rows) {
            return reject(
              new Error('No se encontró el alumno con el ID especificado.'),
            );
          }
          resolve(res.rows[0]); // Devuelve el primer resultado, que debe contener el ID del alumno
        },
      );
    });
  }
}
