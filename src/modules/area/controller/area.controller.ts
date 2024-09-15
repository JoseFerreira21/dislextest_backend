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

import { AreaService } from '../service/area.service';
import { CreateAreaDto, UpdateAreaDto } from '../dtos/area.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private areasService: AreaService) {}

  @Get()
  getBrands() {
    return this.areasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateAreaDto) {
    return this.areasService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateAreaDto) {
    return this.areasService.update(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.areasService.remove(id);
    return {
      message: `Area #${id} eliminado`,
    };
  }
}
