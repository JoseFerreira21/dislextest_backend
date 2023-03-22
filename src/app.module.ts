import { Module , HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlumnoModule } from './modules/alumno/alumno.module';
import { AreaModule } from './modules/area/area.module';
import { EntidadModule } from './modules/entidad/entidad.module';
import { ProfesorModule } from './modules/profesor/profesor.module';
import { ResultadoTestModule } from './modules/resultadotest/resultadotest.module';
import { ResultadoItemModule } from './modules/resultadotestitem/resultadoitem.module'; 
import { UsuarioModule } from './modules/usuario/usuario.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import configSchema from './config/configSchema';

@Module({
  imports: [
    HttpModule,
    AlumnoModule,
    AreaModule,
    EntidadModule,
    ProfesorModule,
    ResultadoTestModule,
    ResultadoItemModule,
    UsuarioModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
