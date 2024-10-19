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

import { ResultadoItemService } from '../service/resultado_item.service';
import {
  CreateResultadoItemDto,
  UpdateResultadoItemDto,
} from '../dtos/resultado_item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('resultadotestitem')
@Controller('resultadotestitem')
export class ResultadoItemController {
  constructor(private resultadoItemService: ResultadoItemService) {}

  @Get()
  getResultadostest() {
    return this.resultadoItemService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultadoItemService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateResultadoItemDto) {
    return this.resultadoItemService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateResultadoItemDto) {
    return this.resultadoItemService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.resultadoItemService.remove(id);
    return {
      message: `Resultado item #${id} eliminado`,
    };
  }
}
