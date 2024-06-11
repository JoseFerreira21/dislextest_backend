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

import { ResultadoEjercicioService } from '../service/resultadoejercicio.service'; 
import { CreateResultadoEjercicioDto } from '../dtos/resultadoejercicio.dto'; 
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';

@ApiTags('resultadoejercicio')
//@UseGuards(JwtAuthGuard)
@Controller('resultadoejercicio')
export class ResultadoEjercicioController {
  constructor(private resultadosEjercicioService: ResultadoEjercicioService) {}

  @Post()
  create(@Body() payload: CreateResultadoEjercicioDto) {
    return this.resultadosEjercicioService.create(payload);
  }

}
