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
  
  import { InstitucionService } from '../service/institucion.service'; 
  import { CreateInstitucionDto } from '../dtos/institucion.dto'; 
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
  import { RolesGuard } from 'src/auth/guards/roles.guard';
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiTags('institucion')
  @Controller('institucion')
  export class InstitucionController {
    constructor(private institucionService: InstitucionService) {}
  
    @Get()
    getBrands() {
      return this.institucionService.findAll();
    }
  
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
      return this.institucionService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateInstitucionDto) {
      return this.institucionService.create(payload);
    }
  

  }
  