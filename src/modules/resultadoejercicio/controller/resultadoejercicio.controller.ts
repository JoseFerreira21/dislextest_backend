import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ResultadoEjercicioService } from '../service/resultadoejercicio.service';
import {
  CreateResultadoEjercicioDto,
  CreateResultadosEjercicioDto,
} from '../dtos/resultadoejercicio.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('resultadoejercicio')
@Controller('resultadoejercicio')
export class ResultadoEjercicioController {
  constructor(private resultadosEjercicioService: ResultadoEjercicioService) {}

  @Post()
  create(@Body() payload: CreateResultadoEjercicioDto) {
    return this.resultadosEjercicioService.create(payload);
  }

  @Post('bulk')
  createMany(@Body() payload: CreateResultadosEjercicioDto) {
    return this.resultadosEjercicioService.createMany(payload.resultados);
  }

  @Get(':alumnoId/:itemId')
  getTestDetails(
    @Param('alumnoId', ParseIntPipe) alumnoId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.resultadosEjercicioService.findTestDetails(alumnoId, itemId);
  }
}
