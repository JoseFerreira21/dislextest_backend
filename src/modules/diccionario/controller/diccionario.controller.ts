import { Controller, Get, UseGuards } from '@nestjs/common';

//import { AlumnoService } from '../service/alumno.service';
//import { CreateAlumnoDto, UpdateAlumnoDto } from '../dtos/alumno.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Public } from '../../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { DiccionarioService } from '../service/diccionario.service';

//@ApiBearerAuth()
@ApiTags('diccionario')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('diccionario')
export class DiccionarioController {
  constructor(private diccionarioService: DiccionarioService) {}
  //#1-------------------------FORMAR PALABRAS-----------------------------//
  //@Public()
  @Get('formar-palabras')
  getFormarPalabras() {
    return this.diccionarioService.findDiccionarioFormarPalabras();
  }
  
  //#2-------------------------DISCRIMINACION VISUAL-----------------------------//
  //@Public()
  @Get('discriminacion-visual')
  getDiscriminacionVisual() {
    return this.diccionarioService.findDiccionarioDiscriminacionVisual();
  }

  //@Public()
  @Get('discriminacion-visual-v2')
  getDiscriminacionVisualV2() {
    return this.diccionarioService.findDiccionarioDiscriminacionVisualV2();
  }

  //#3-------------------------DISCRIMINACION PALABRAS-----------------------------//
  //@Public()
  @Get('discriminacion-palabras')
  getDiscriminacionPalabras() {
    return this.diccionarioService.findDiccionarioDiscriminacionPalabras();
  }

  //@Public()
  @Get('discriminacion-palabras-v2')
  getDiscriminacionPalabrasV2() {
    return this.diccionarioService.findDiccionarioDiscriminacionPalabrasV2();
  }

  ///#4-------------------------ENCONTRAR LETRAS EN PALABRAS-----------------------------//
  //@Public()
  @Get('encontrar-letras-en-palabras')
  getEncontrarLetras() {
    return this.diccionarioService.findDiccionarioEncontrarLetras();
  }

  //@Public()
  @Get('encontrar-letras-en-palabras-v2')
  getEncontrarLetrasV2() {
    return this.diccionarioService.findDiccionarioEncontrarLetrasV2();
  }

}
