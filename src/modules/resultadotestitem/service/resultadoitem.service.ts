import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { ResultadoItem } from '../entities/resultadoitem.entity';
import { ResultadoTest } from 'src/modules/resultadotest/entities/resultadotest.entity'; 
import { Areas } from 'src/modules/area/entities/areas.entity';
import {
  CreateResultadoItemDto,
  UpdateResultadoItemDto,
} from '../dtos/resultadoitem.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags();
@Injectable()
export class ResultadoItemService {
  constructor(
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(ResultadoItem) private resultadoItemRepository: Repository<ResultadoItem>,
    @InjectRepository(ResultadoTest) private resultadoTestRepository: Repository<ResultadoTest>,
    @InjectRepository(Areas) private areaRepository: Repository<Areas>,
    ) {}

  findAll() {
    return this.resultadoItemRepository.find();
  }

  async findOne(id: number): Promise<ResultadoItem> {
    const resultadoitem = await this.resultadoItemRepository.findOne({
      where: { id }, relations: ['area' ,'resultadotest'],
    });
    if (!resultadoitem) {
      throw new NotFoundException(`Resultado item #${id} no existe`);
    }
    return resultadoitem;
  }

  async create(data: CreateResultadoItemDto) {
    const newResultadoItem = this.resultadoItemRepository.create(data);
    if (data.ResultadoTestId) {
      const resultadoTest = await this.resultadoTestRepository.findOne(data.ResultadoTestId);
      newResultadoItem.resultadotest = resultadoTest;
    }
    
    if (data.AreaId) {
      const resultadoArea = await this.areaRepository.findOne(data.AreaId);
      newResultadoItem.area = resultadoArea;
    }
    
    return this.resultadoItemRepository.save(newResultadoItem);
  }

  async update(id: number, changes: UpdateResultadoItemDto) {
    const resultadoitem = await this.resultadoItemRepository.findOne({
      where: { id: id },
    });
    if (!resultadoitem) {
      throw new NotFoundException(`Resultado item #${id} no existe`);
    }
    if (changes.ResultadoTestId) {
      const resultadoTest = await this.resultadoTestRepository.findOne(changes.ResultadoTestId);
      resultadoitem.resultadotest = resultadoTest;
    }

    if (changes.AreaId) {
      const resultadoArea = await this.areaRepository.findOne(changes.AreaId);
      resultadoitem.area = resultadoArea;
    }

    this.resultadoItemRepository.merge(resultadoitem, changes);
    return this.resultadoItemRepository.save(resultadoitem);
  }

  async remove(id: number) {
    const index = await this.resultadoItemRepository.findOne({
      where: { id: id },
    });
    if (!index) {
      throw new NotFoundException(`Resultado item #${id} no existe`);
    }
    return this.resultadoItemRepository.remove(index);
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
