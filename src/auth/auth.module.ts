import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService : ConfigType<typeof config>) => {
        return {
          secret: configService.jswSecret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
