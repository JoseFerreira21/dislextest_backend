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
    //private entidadService : EntidadService,
    //private profesorService : ProfesorService,
  ){}

  findAll() {
    return this.ResultadoTestRepository.find();
  }

  async findOne(id: number): Promise<ResultadoTest> {
    const resultadotest = await this.ResultadoTestRepository.findOne({
      where: { id } , relations: ['resultadoitems'],
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

  /*
  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  }
  */
}
