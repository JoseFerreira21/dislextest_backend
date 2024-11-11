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
    const institucion = await this.institucionRepository.findOne({
      where: { id: id },
    });
    if (!institucion) {
      throw new NotFoundException(`Institucion #${id} no existe`);
    }
    return institucion;
  }

  create(data: CreateInstitucionDto) {
    const newInstitucion = this.institucionRepository.create(data);
    return this.institucionRepository.save(newInstitucion);
  }

  
}
