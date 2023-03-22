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

import { ResultadoTestService } from '../service/resultadotest.service';
import {
  CreateResultadotestDto,
  UpdateResultadotestDto,
} from '../dtos/resultadotest.dto';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';

@ApiTags('resultadotest')
//@UseGuards(JwtAuthGuard)
@Controller('resultadotest')
export class ResultadoTestController {
  constructor(private resultadotestService: ResultadoTestService) {}

  @Get()
  getResultadostest() {
    return this.resultadotestService.findAll();
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
