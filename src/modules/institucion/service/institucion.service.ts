import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Instituciones } from '../entities/institucion.entity';
import { CreateInstitucionDto } from '../dtos/institucion.dto'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class InstitucionService {
  constructor(
    @InjectRepository(Instituciones) private institucionRepository: Repository<Instituciones>,
  ) {}

  findAll() {
    return this.institucionRepository.find();
  }

  async findOne(id: number): Promise<Instituciones> {
    const area = await this.institucionRepository.findOne({
      where: { id: id },
    });
    if (!area) {
      throw new NotFoundException(`Area #${id} no existe`);
    }
    return area;
  }

  create(data: CreateInstitucionDto) {
    const newArea = this.institucionRepository.create(data);
    return this.institucionRepository.save(newArea);
  }

  
}
