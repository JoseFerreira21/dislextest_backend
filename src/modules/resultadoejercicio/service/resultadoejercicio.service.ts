import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultadoEjercicios } from '../entities/resultadoejercicio.entity'; 
import { CreateResultadoEjercicioDto, CreateResultadosEjercicioDto } from '../dtos/resultadoejercicio.dto'; 
import { ApiTags } from '@nestjs/swagger';

import { ResultadoItem } from 'src/modules/resultadotestitem/entities/resultadoitem.entity';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';
import { EjerciciosOpciones } from 'src/modules/ejercicioopcion/entities/ejercicioopcion.entity';
import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';

@ApiTags()
@Injectable()
export class ResultadoEjercicioService {
  constructor(
    @InjectRepository(ResultadoEjercicios) private resultadoEjercicioRepository: Repository<ResultadoEjercicios>,
    @InjectRepository(Ejercicios) private ejerciciosRepository: Repository<Ejercicios>,
    @InjectRepository(EjerciciosOpciones) private ejerciciosOpcionesRepository: Repository<EjerciciosOpciones>,
    @InjectRepository(Alumnos) private alumnosRepository: Repository<Alumnos>,
    @InjectRepository(ResultadoItem) private resultadoItemRepository: Repository<ResultadoItem>,
  ) {}

  async create(data: CreateResultadoEjercicioDto) {
    const newResultadoEjercicio = this.resultadoEjercicioRepository.create(data);
    
    if (data.ejercicioId) {
      const resultadoEjercicio = await this.ejerciciosRepository.findOne(data.ejercicioId);
      newResultadoEjercicio.ejercicio = resultadoEjercicio;
    }
    
    if (data.ejercicioOpcionesId) {
      const resultadoEjercicioOpcion = await this.ejerciciosOpcionesRepository.findOne(data.ejercicioOpcionesId);
      newResultadoEjercicio.ejercicioOpciones = resultadoEjercicioOpcion;
    }
    
    if (data.alumnoId) {
      const resultadoAlumno = await this.alumnosRepository.findOne(data.alumnoId);
      newResultadoEjercicio.alumno = resultadoAlumno;
    }

    if (data.resultadoItemId) {
      const resultadoEjercicio = await this.resultadoItemRepository.findOne(data.resultadoItemId);
      newResultadoEjercicio.resultadoitem = resultadoEjercicio;
    }
    
    return this.resultadoEjercicioRepository.save(newResultadoEjercicio);
  }

  async createMany(dataArray: CreateResultadoEjercicioDto[]) {
    const results = [];
    for (const data of dataArray) {
      const result = await this.create(data);
      results.push(result);
    }
    return results;
  }
}
