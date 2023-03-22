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

import { ProfesorService } from '../service/profesor.service';
import { CreateProfesorDto, UpdateProfesorDto } from '../dtos/profesor.dto';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';

@ApiTags('profesor')
//@UseGuards(JwtAuthGuard)
@Controller('profesor')
export class ProfesorController {
  constructor(private profesorService: ProfesorService) {}

  @Get()
  getProducts() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesorService.findOne(id);
  }

  //Para peticiones de varios productos.
  //http://localhost:3000/products?limit=1000&offset=1500
  //http://localhost:3000/products?brand=xyz
  /*@Get('profesor')
  getProducts(
    @Query('limit') limit: 100,
    @Query('offset') offset: 0,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit}, offset => ${offset}, brand => ${brand}`;
  }*/

  @Post()
  create(@Body() payload: CreateProfesorDto) {
    return this.profesorService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProfesorDto) {
    return this.profesorService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.profesorService.remove(id);
    return {
      message: `Profesor #${id} eliminado`,
    };
  }
}
