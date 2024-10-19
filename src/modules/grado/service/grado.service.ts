import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Grados } from '../entities/grado.entity'; 
import { CreateGradoDto } from '../dtos/grado.dto'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class GradoService {
  constructor(
    @InjectRepository(Grados) private gradoRepository: Repository<Grados>,
  ) {}

  findAll() {
    return this.gradoRepository.find();
  }

  async findOne(id: number): Promise<Grados> {
    const area = await this.gradoRepository.findOne({
      where: { id: id },
    });
    if (!area) {
      throw new NotFoundException(`Grado #${id} no existe`);
    }
    return area;
  }

  create(data: CreateGradoDto) {
    const newArea = this.gradoRepository.create(data);
    return this.gradoRepository.save(newArea);
  }

  
}
