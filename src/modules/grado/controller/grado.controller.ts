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
  
  import { GradoService } from '../service/grado.service';
  import { CreateGradoDto } from '../dtos/grado.dto'; 
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
  import { RolesGuard } from 'src/auth/guards/roles.guard';
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiTags('grado')
  @Controller('grado')
  export class GradoController {
    constructor(private gradoService: GradoService) {}
  
    @Get()
    getBrands() {
      return this.gradoService.findAll();
    }
  
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
      return this.gradoService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateGradoDto) {
      return this.gradoService.create(payload);
    }
  

  }
  