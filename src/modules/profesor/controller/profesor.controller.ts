import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ProfesorService } from '../service/profesor.service';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profesor')
@Controller('profesor')
export class ProfesorController {
  constructor(private profesorService: ProfesorService) {}

  @Get()
  getAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesorService.findOne(id);
  }

  @Get('usuario/:idUsuario')
  getProfesorByUserId(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.profesorService.findProfesorByUserId(idUsuario);
  }

  @Post()
  create(@Body() payload: CreateProfesorDto) {
    return this.profesorService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProfesorDto) {
    return this.profesorService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.profesorService.remove(id);
    return {
      message: `Profesor #${id} eliminado`,
    };
  }
}
