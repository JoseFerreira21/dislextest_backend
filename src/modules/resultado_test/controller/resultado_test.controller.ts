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

import { ResultadoTestService } from '../service/resultado_test.service';
import {
  CreateResultadotestDto,
  UpdateResultadotestDto,
} from '../dtos/resultado_test.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('resultadotest')
@Controller('resultadotest')
export class ResultadoTestController {
  constructor(private resultadotestService: ResultadoTestService) {}

  @Get()
  getAll() {
    return this.resultadotestService.findAll();
  }

  @Get('profesor/:idProfesor')
  getResultadostest(@Param('idProfesor', ParseIntPipe) idProfesor: number) {
    return this.resultadotestService.findAllAlumnosByProfesor(idProfesor);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultadotestService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateResultadotestDto) {
    return this.resultadotestService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateResultadotestDto) {
    return this.resultadotestService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.resultadotestService.remove(id);
    return {
      message: `Resultado test #${id} eliminado`,
    };
  }
}
