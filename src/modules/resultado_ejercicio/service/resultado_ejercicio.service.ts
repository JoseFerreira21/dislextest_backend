import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResultadoEjercicios } from '../entities/resultado_ejercicio.entity'; 
import { CreateResultadoEjercicioDto, CreateResultadosEjercicioDto } from '../dtos/resultado_ejercicio.dto'; 
import { ApiTags } from '@nestjs/swagger';

import { ResultadoItem } from 'src/modules/resultado_test_item/entities/resultado_item.entity';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';
import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';

import { Client } from 'pg';

@ApiTags()
@Injectable()
export class ResultadoEjercicioService {
  constructor(@Inject('PG') private clientPg: Client,
    @InjectRepository(ResultadoEjercicios) private resultadoEjercicioRepository: Repository<ResultadoEjercicios>,
    @InjectRepository(Ejercicios) private ejerciciosRepository: Repository<Ejercicios>,
    @InjectRepository(EjerciciosOpciones) private ejerciciosOpcionesRepository: Repository<EjerciciosOpciones>,
    @InjectRepository(Alumnos) private alumnosRepository: Repository<Alumnos>,
    @InjectRepository(ResultadoItem) private resultadoItemRepository: Repository<ResultadoItem>,
  ) {}

  async create(data: CreateResultadoEjercicioDto) {
    const newResultadoEjercicio = this.resultadoEjercicioRepository.create(data);
    
    if (data.ejercicioId) {
      const resultadoEjercicio = await this.ejerciciosRepository.findOne(data.ejercicioId);
      newResultadoEjercicio.ejercicio = resultadoEjercicio;
    }
    
    if (data.ejercicioOpcionesId) {
      const resultadoEjercicioOpcion = await this.ejerciciosOpcionesRepository.findOne(data.ejercicioOpcionesId);
      newResultadoEjercicio.ejercicioOpciones = resultadoEjercicioOpcion;
    }
    
    if (data.alumnoId) {
      const resultadoAlumno = await this.alumnosRepository.findOne(data.alumnoId);
      newResultadoEjercicio.alumno = resultadoAlumno;
    }

    if (data.resultadoItemId) {
      const resultadoEjercicio = await this.resultadoItemRepository.findOne(data.resultadoItemId);
      newResultadoEjercicio.resultadoitem = resultadoEjercicio;
    }
    
    return this.resultadoEjercicioRepository.save(newResultadoEjercicio);
  }

  async createMany(dataArray: CreateResultadoEjercicioDto[]) {
    const results = [];
    for (const data of dataArray) {
      const result = await this.create(data);
      results.push(result);
    }
    return results;
  }

  findTestDetails(alumnoId: number, itemId: number) {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `select to_char(
                    '00:00'::time + INTERVAL '1 second' * ri."tiempoEmpleado",
                    'MI:SS'
                ) as "tiempoEmpleado",
                --eo.respuesta as "respuestaCorrectaEjercicio",
                case 
                    when e.id = 7 then
                        'Sílaba: ' || eo.respuesta || ' - Palabra (' || 
                        (select palabra 
                        from diccionario_encerrar_silabas_cs desc2 
                        where desc2."ejercicioOpcionesId" = eo.id) || ')'
                    when e.id = 8 then
                        case 
                            when eo.respuesta = '8' then '8 - Letra (p)'
                            when eo.respuesta = '6' then '6 - Letra (b)'
                            when eo.respuesta = '3' then '3 - Letra (d)'
                            else eo.respuesta
                        end
                    when e.id = 9 then
                        'Sílaba: ' || eo.respuesta || ' - Palabra (' || 
                        (select palabra 
                        from diccionario_encerrar_silabas_cf desc2 
                        where desc2."ejercicioOpcionesId" = eo.id) || ')'
                    when e.id = 10 then
                        'Posición: ' || eo.respuesta || ' - Imagen: (' || 
                        (select palabra 
                        from diccionario_izquierda_derecha did 
                        where did."ejercicioOpcionesId" = eo.id) || ')'
                    else eo.respuesta
                end as "respuestaCorrectaEjercicio",
                re."respuestaRespondida" as "respuestaHechaAlumno",
                re.acierto
            from 
                ejercicios e
                join ejercicios_opciones eo on e.id = eo."ejercicioId"
                join resultado_ejercicios re on e.id = re."ejercicioId" and eo.id = re."ejercicioOpcionesId"
                join resultado_item ri on re."resultadoitemId" = ri.id
            where 
                re."alumnoId"  = $1
                and re."resultadoitemId" = $2
            order by 
                re."ejercicioOpcionesId"`,
              [alumnoId, itemId],
              (err, res) => {
                if (err) {
                  return reject(err);
                }
                if (!res || !res.rows) {
                  return reject(new Error('Unexpected response format from the database.'));
                }
                resolve(res.rows);
              }
            );
          });
        }
}
