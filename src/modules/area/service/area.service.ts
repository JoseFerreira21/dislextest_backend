import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Areas } from '../entities/areas.entity';
import { CreateAreaDto, UpdateAreaDto } from '../dtos/area.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Areas) private areaRepository: Repository<Areas>,
  ) {}

  findAll() {
    return this.areaRepository.find();
  }

  async findOne(id: number): Promise<Areas> {
    const area = await this.areaRepository.findOne({
      where: { id: id },
      relations: ['resultadoitems'],
    });
    if (!area) {
      throw new NotFoundException(`Area #${id} no existe`);
    }
    return area;
  }

  create(data: CreateAreaDto) {
    const newArea = this.areaRepository.create(data);
    return this.areaRepository.save(newArea);
  }

  async update(id: number, changes: UpdateAreaDto) {
    const area = await this.areaRepository.findOne({ where: { id: id } });
    if (!area) {
      throw new NotFoundException(`Area #${id} no existe`);
    }
    this.areaRepository.merge(area, changes);
    return this.areaRepository.save(area);
  }

  async remove(id: number) {
    const index = await this.areaRepository.findOne({ where: { id: id } });
    if (!index) {
      throw new NotFoundException(`Area #${id} no existe`);
    }
    return this.areaRepository.remove(index);
  }
}
