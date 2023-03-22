import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
//import { jwtConstants } from './constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';
import config from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // OBTENDREMOS EL TOKEN LOS HEADERS COMO 'Bearer token'
      ignoreExpiration: false,
      // IGNORA LA EXPIRACION, EN TU CASO EL TIEMPO QUE LE HAYAS PUESTO
      // EJE.  signOptions: { expiresIn: '24h' }, YO LE PUSE 1 DIA
      secretOrKey: configService.jswSecret,
      // LA LLAVE SECRETA CON LA QUE FIRMAMOS EL TOKEN AL HACER LOGIN
    });
  }

  // ESTA FUNCION LO QUE HARA SERA RECIBIR EL TOKEN DECODIFICADO
  // CON LA CARGA DE DATOS QUE LE PUSIMOS AL HACER LOGIN
  async validate(payload: PayloadToken) {
    return payload;
  }
}
