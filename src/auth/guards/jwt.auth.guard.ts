import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // CON ESTA FUNCION DE PODEMOS PERSONALIZAR SI
  //  QUEREMOS LANZAR ERRORES PERZONALIZADOS
  /*handleRequest(err, user, info) {
    if (err || !user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuario no autorizado',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }*/

  constructor (private reflector: Reflector){
    super();
  }

  canActivate(contex: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, contex.getHandler());
    if (isPublic){
      return true;
    }
     return super.canActivate(contex);
  }
  
}
