import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { Usuarios } from 'src/modules/usuario/entities/usuarios.entity';
import { UsuarioService } from 'src/modules/usuario/service/usuario.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Req() req: Request) {
    const user = req.user as Usuarios;
    return this.authService.generateJWT(user);
  }

  @HttpCode(200)
  @Post('is-available')
  async isAvailable(@Req() req: Request): Promise<any> {
    const email = req.body.email as string;
    //console.log(email);
    let isAvailable: boolean;

    await this.authService.existEmail(email).then((res) => {
      //console.log(res);
      isAvailable = res;
    });

    //console.log(isAvailable);
    return { isAvailable: isAvailable }; //validación ternaria

    /*
   if (!userEmail) {
    return {message: "true"};
   }
   return {message: "false"};
  */
  }
}
