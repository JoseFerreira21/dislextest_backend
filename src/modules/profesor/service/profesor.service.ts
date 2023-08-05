import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Profesores } from '../entities/profesores.entity';
import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
//import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesores)
    private profesorRepository: Repository<Profesores>,
    @InjectRepository(Entidades) private entidadRepo: Repository<Entidades>,
    //@InjectRepository(Alumnos) private alumnoRepo: Repository<Alumnos>,
  ) {}

  findAll() {
    return this.profesorRepository.find({ relations: ['entidad'] });
  }

  async findOne(id: number): Promise<Profesores> {
    const profesor = await this.profesorRepository.findOne(id, {
      relations: ['entidad', 'alumnos'],
      where: { id: id },
    });
    if (!profesor) {
      throw new NotFoundException(`Profesor #${id} no existe`);
    }
    return profesor;
  }

  async create(data: CreateProfesorDto) {
    const newProfesor = this.profesorRepository.create(data);
    if (data.entidadId) {
      const entidad = await this.entidadRepo.findOne(data.entidadId);
      newProfesor.entidad = entidad; //relación uno a uno
    }

    return this.profesorRepository.save(newProfesor);
  }

  async update(id: number, changes: UpdateProfesorDto) {
    const profesor = await this.profesorRepository.findOne({
      where: { id: id },
    });
    if (!profesor) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.profesorRepository.merge(profesor, changes);
    return this.profesorRepository.save(profesor);
  }

  async remove(id: number) {
    const index = await this.profesorRepository.findOne({ where: { id: id } });
    if (!index) {
      throw new NotFoundException(`Profesor #${id} no existe`);
    }
    return this.profesorRepository.remove(index);
  }
}
