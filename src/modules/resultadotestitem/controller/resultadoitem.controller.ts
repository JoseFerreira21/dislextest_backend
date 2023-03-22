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

import { ResultadoItemService } from '../service/resultadoitem.service';
import {
  CreateResultadoItemDto,
  UpdateResultadoItemDto,
} from '../dtos/resultadoitem.dto';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/decorators/public.decorator'
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';

@ApiTags('resultadotestitem')
//@UseGuards(JwtAuthGuard)
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
