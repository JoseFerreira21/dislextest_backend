import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { ResultadoTest } from '../entities/resultadotest.entity';
//import { EntidadService } from 'src/modules/entidad/service/entidad.service';
//import { ProfesorService } from 'src/modules/profesor/service/profesor.service';
import {
  CreateResultadotestDto,
  UpdateResultadotestDto,
} from '../dtos/resultadotest.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags();
@Injectable()
export class ResultadoTestService {
  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(ResultadoTest)
    private ResultadoTestRepository: Repository<ResultadoTest>,
  ) //private entidadService : EntidadService,
  //private profesorService : ProfesorService,
  {}

  findAll() {
        return this.ResultadoTestRepository.find();
      }

  findAllAlumnosByProfesor(idProfesor: number) {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT v.*
           FROM v_resultados v, alumnos a, profesores p 
          WHERE 1 = 1
            and v.id_alumno = a.id 
            and a."profesorId" = p.id
            and a."profesorId" = ${idProfesor}
         order by v.nombre_alumno, v.id_resultadotest `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  async findOne(id: number): Promise<ResultadoTest> {
    const resultadotest = await this.ResultadoTestRepository.findOne({
      where: { id },
      relations: ['resultadoitems'],
    });
    if (!resultadotest) {
      throw new NotFoundException(`Resultado test #${id} no existe`);
    }
    return resultadotest;
  }

  async create(data: CreateResultadotestDto) {
    const newResultadoTest = this.ResultadoTestRepository.create(data);
    return this.ResultadoTestRepository.save(newResultadoTest);
  }

  async update(id: number, changes: UpdateResultadotestDto) {
    const resultadotest = await this.ResultadoTestRepository.findOne({
      where: { id: id },
    });
    if (!resultadotest) {
      throw new NotFoundException(`Resultado test #${id} no existe`);
    }
    this.ResultadoTestRepository.merge(resultadotest, changes);
    return this.ResultadoTestRepository.save(resultadotest);
  }

  async remove(id: number) {
    const index = await this.ResultadoTestRepository.findOne({
      where: { id: id },
    });
    if (!index) {
      throw new NotFoundException(`Resultado test #${id} no existe`);
    }
    return this.ResultadoTestRepository.remove(index);
  }
}
