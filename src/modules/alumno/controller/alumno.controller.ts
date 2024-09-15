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

import { AlumnoService } from '../service/alumno.service';
import { CreateAlumnoDto, UpdateAlumnoDto } from '../dtos/alumno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('alumno')
@Controller('alumno')
export class AlumnoController {
  constructor(private alumnosService: AlumnoService) {}

  //@Roles(Role.ADMIN, Role.PROFESOR)
  @Get()
  getAlumnos() {
    return this.alumnosService.findAll();
  }

  @Get()
  getAlumnosEntidad() {
    return this.alumnosService.findAllAlumns();
  }

  @Get('ci/:ci')
  getAlumnoIdByCI(@Param('ci', ParseIntPipe) ci: string) {
    return this.alumnosService.findAlumnoIdByCI(ci);
  }

  @Get('entidad/:idEntidad')
  getAlumnoIdByEntidadID(@Param('idEntidad', ParseIntPipe) idEntidad: number) {
    return this.alumnosService.findAlumnoIdByEntidadID(idEntidad);
  }

  @Get('profesor/:idProfesor')
  getAlumnosByProfesor(@Param('idProfesor', ParseIntPipe) idProfesor: number) {
    return this.alumnosService.findAllByProfesor(idProfesor);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumnosService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateAlumnoDto) {
    return this.alumnosService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateAlumnoDto) {
    return this.alumnosService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.alumnosService.remove(id);
    return {
      message: `Alumno #${id} eliminado`,
    };
  }
}
