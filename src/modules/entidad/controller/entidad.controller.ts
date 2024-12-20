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

import { EntidadService } from '../service/entidad.service';
import { CreateEntidadDto, UpdateEntidadDto } from '../dtos/entidad.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('entidad')
@Controller('entidad')
export class EntidadController {
  constructor(private entidadesService: EntidadService) {}

  @Get()
  getEntidades() {
    return this.entidadesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.entidadesService.findOne(id);
  }

  @Get('/usuario/:idUsuario')
  getOneUserId(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.entidadesService.findOneByUserId(idUsuario);
  }

  @Post()
  create(@Body() payload: CreateEntidadDto) {
    return this.entidadesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateEntidadDto) {
    return this.entidadesService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.entidadesService.remove(id);
    return {
      message: `Entidad #${id} eliminada`,
    };
  }
}
