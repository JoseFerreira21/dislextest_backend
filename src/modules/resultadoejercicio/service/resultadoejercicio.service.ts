import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultadoEjercicios } from '../entities/resultadoejercicio.entity'; 
import { CreateResultadoEjercicioDto } from '../dtos/resultadoejercicio.dto'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class ResultadoEjercicioService {
  constructor(
    @InjectRepository(ResultadoEjercicios) private resultadoEjercicio: Repository<ResultadoEjercicios>,
  ) {}

  
  create(data: CreateResultadoEjercicioDto) {
    const newResultadoEjercicio = this.resultadoEjercicio.create(data);
    return this.resultadoEjercicio.save(newResultadoEjercicio);
  }

 
}
