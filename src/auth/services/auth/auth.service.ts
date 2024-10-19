import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsuarioService } from 'src/modules/usuario/service/usuario.service'; 
import { Usuarios } from 'src/modules/usuario/entities/usuarios.entity';
import { PayloadToken } from '../../models/token.model'

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuarioService.findByMail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  async existEmail(email: string){
    const userEmail = await this.usuarioService.findByMail(email);
    if (userEmail == undefined) {
      return true;
    }
    return false;
  }

  generateJWT(user: Usuarios){
    const payload: PayloadToken = { role: user.role, sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }

  async checkToken(token:any){
    try{
       return this.jwtService.verify(token.jwt,{secret:process.env.SECRET_KEY});
    }catch(e){
        console.log(e);
       return false
    }
   }
}
