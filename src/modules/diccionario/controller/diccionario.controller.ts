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
  @Get('discriminacion-visual')
  getDiscriminacionVisual() {
    return this.diccionarioService.findDiccionarioDiscriminacionVisual();
  }

  //#3-------------------------DISCRIMINACION PALABRAS-----------------------------//
  @Get('discriminacion-palabras')
  getDiscriminacionPalabras() {
    return this.diccionarioService.findDiccionarioDiscriminacionPalabras();
  }
  
  ///#4--------------------------ENCONTRAR LETRAS EN PALABRAS-----------------------------//
  @Get('encontrar-letras-en-palabras')
  getEncontrarLetras() {
    return this.diccionarioService.findDiccionarioEncontrarLetrasV2();
  }

  ///#5--------------------------ENCERRAR PALABRAS-----------------------------//
  @Get('encerrar-palabras')
  getEncerrarPalabras() {
    return this.diccionarioService.findDiccionarioEncerrarPalabra();
  }

  ///#6--------------------------LETRAS DESORDENADAS-----------------------------//
  @Get('letras-desordenadas')
  getLetrasDesordenadas() {
    return this.diccionarioService.findDiccionarioLetrasDesordenadas();
  }

  ///#7--------------------------ENCERRAR SILABAS CONCIENCIA SILABICA-----------------------------//
  @Get('encerrar-silabas-conciencia-silabica')
  geEncerrarSilabasCs() {
    return this.diccionarioService.findDiccionarioEncerrarSilabasCS();
  }

  ///#8--------------------------CONTAR LETRAS-----------------------------//
  @Get('contar-letras')
  geContarLetras() {
    return this.diccionarioService.findDiccionarioContarLetras();
  }

  ///#9--------------------------ENCERRAR SILABAS CONCIENCIA FONOLOGICA-----------------------------//
  @Get('encerrar-silabas-conciencia-fonologica')
  geEncerrarSilabasCf() {
    return this.diccionarioService.findDiccionarioEncerrarSilabasCF();
  }

  ///#10--------------------------IZQUIERDA DERECHA-----------------------------//
  @Get('izquierda-derecha')
  geIzquierdaDerecha() {
    return this.diccionarioService.findDiccionarioIzquierdaDerecha();
  }
  

}
