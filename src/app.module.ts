import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlumnoModule } from './modules/alumno/alumno.module';
import { AreaModule } from './modules/area/area.module';
import { EntidadModule } from './modules/entidad/entidad.module';
import { ProfesorModule } from './modules/profesor/profesor.module';
import { ResultadoTestModule } from './modules/resultado_test/resultado_test.module';
import { ResultadoItemModule } from './modules/resultado_test_item/resultado_item.module'; 
import { UsuarioModule } from './modules/usuario/usuario.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { enviroments } from './enviroments'; // Archivo donde configuramos diferentes entornos (dev, prod, etc.)
import config from './config/config'; // Archivo de configuración personalizado
import configSchema from './config/configSchema'; // Archivo con el esquema de validación de las variables de entorno
import { AuthModule } from './auth/auth.module';
import { DiccionarioModule } from './modules/diccionario/diccionario.module';
import { EjercicioModule } from './modules/ejercicio/ejercicio.module';
import { EjercicioOpcionModule } from './modules/ejercicio_opcion/ejercicio_opcion.module';
import { DiccionarioFormarPalabrasModule } from './modules/diccionario_formar_palabra/diccionario_formar_palabas.module';
import { ResultadoEjercicioModule } from './modules/resultado_ejercicio/resultado_ejercicio.module';
import { DiccionarioDiscriminacionVisualModule } from './modules/diccionario_discriminacion_visual/diccionario_discriminacion_visual.module';
import { DiccionarioDiscriminacionPalabraModule } from './modules/diccionario_discriminacion_palabra/diccionario_discriminacion_palabras.module';
import { DiccionarioEncontrarLetrasModule } from './modules/diccionario_encontrar_letras/diccionario_encontrarletras.module';
import { GradoModule } from './modules/grado/grado.module';
import { InstitucionModule } from './modules/institucion/institucion.module';
import { DiccionarioLetrasDesordenadasModule } from './modules/diccionario_letras_desordenadas/diccionarioletrasdesordenadas.module';
import { DiccionarioEncerrarSilabasCsModule } from './modules/diccionario_encerrar_silaba_cs/diccionario_encerrar_silaba_cs.module';
import { DiccionarioEncerrarSilabasCfModule } from './modules/diccionario_encerrar_silaba_cf/diccionario_encerrar_silaba_cf.module';
import { DiccionarioContarLetrasModule } from './modules/diccionario_contar_letras/diccionario_contar_letras.module';
import { DiccionarioIzquierdaDerechaModule } from './modules/diccionario_izquierda_derecha/diccionario_izquierda_derecha.module';

@Module({
  imports: [
    HttpModule,
    AlumnoModule,
    AreaModule,
    DiccionarioModule,
    EntidadModule,
    ProfesorModule,
    ResultadoTestModule,
    ResultadoItemModule,
    UsuarioModule,
    EjercicioModule,
    EjercicioOpcionModule,
    ResultadoEjercicioModule,
    DiccionarioFormarPalabrasModule,
    DiccionarioDiscriminacionVisualModule,
    DiccionarioDiscriminacionPalabraModule,
    DiccionarioEncontrarLetrasModule,
    DiccionarioLetrasDesordenadasModule,
    DiccionarioEncerrarSilabasCsModule,
    DiccionarioContarLetrasModule,
    DiccionarioEncerrarSilabasCfModule,
    DiccionarioIzquierdaDerechaModule,
    DatabaseModule,
    GradoModule,
    InstitucionModule,

    // Configuración del módulo de configuración con diferentes entornos
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // Cargamos el archivo de entorno adecuado
      load: [config], // Cargamos configuraciones adicionales desde `config.ts`
      isGlobal: true, // Hacemos las variables disponibles globalmente
      validationSchema: configSchema, // Validamos las variables con `configSchema`
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
