import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { DiccionarioService } from '../service/diccionario.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('diccionario')
@Controller('diccionario')
export class DiccionarioController {
  constructor(private diccionarioService: DiccionarioService) {}
  //#1-------------------------FORMAR PALABRAS-----------------------------//
  @Get('formar-palabras')
  getFormarPalabras() {
    return this.diccionarioService.findDiccionarioFormarPalabras();
  }

  //#2-------------------------DISCRIMINACION VISUAL-----------------------------//
  //@Get('discriminacion-visual')
  //getDiscriminacionVisual() {
  // return this.diccionarioService.findDiccionarioDiscriminacionVisual();
  //}

  @Get('discriminacion-visual')
  getDiscriminacionVisual() {
    return this.diccionarioService.findDiccionarioDiscriminacionVisualV2();
  }

  //#3-------------------------DISCRIMINACION PALABRAS-----------------------------//
  //@Get('discriminacion-palabras')
  //getDiscriminacionPalabras() {
  //  return this.diccionarioService.findDiccionarioDiscriminacionPalabras();
  //}

  @Get('discriminacion-palabras')
  getDiscriminacionPalabras() {
    return this.diccionarioService.findDiccionarioDiscriminacionPalabrasV2();
  }

  ///#4-------------------------ENCONTRAR LETRAS EN PALABRAS-----------------------------//
  //@Get('encontrar-letras-en-palabras')
  //getEncontrarLetras() {
  //  return this.diccionarioService.findDiccionarioEncontrarLetras();
  //}

  @Get('encontrar-letras-en-palabras')
  getEncontrarLetras() {
    return this.diccionarioService.findDiccionarioEncontrarLetrasV2();
  }

  @Get('encerrar-palabras')
  getEncerrarPalabras() {
    return this.diccionarioService.findDiccionarioEncerrarPalabra();
  }
}
