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

import { Public } from '../../../auth/decorators/public.decorator'
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

//@ApiBearerAuth()
@ApiTags('alumno')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alumno')
export class AlumnoController {
  constructor(private alumnosService: AlumnoService,) {}

  //@Public()
  @Get()
  getAlumnos() {
    return this.alumnosService.findAll();
  }
  
  //@Public()
  @Get()
  getAlumnosEntidad() {
    return this.alumnosService.findAllAlumns();
  }
 
  @Get(':idProfesor')
  getAlumnosByProfesor(@Param('idProfesor', ParseIntPipe) idProfesor: number) {
    return this.alumnosService.findAllByProfesor(idProfesor);
  }
  
  //@Roles(Role.ADMIN, Role.PROFESOR)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumnosService.findOne(id);
  }
  //@Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateAlumnoDto) {
    return this.alumnosService.create(payload);
  }
  
  //@Roles(Role.ADMIN, Role.PROFESOR)
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateAlumnoDto) {
    return this.alumnosService.update(+id, payload);
  }
  
  //@Roles(Role.ADMIN, Role.PROFESOR)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.alumnosService.remove(id);
    return {
      message: `Alumno #${id} eliminado`,
    };
  }

}
