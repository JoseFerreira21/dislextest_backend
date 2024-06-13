import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';

import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Injectable()
export class DiccionarioService {
  constructor(@Inject('PG') private clientPg: Client) {}
  //-------------------------FORMAR PALABRAS-----------------------------//
  findDiccionarioFormarPalabras() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `select a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                dfp."ejercicioOpcionesId",
                dfp.palabra as palabra,
                palabras_a_letras(dfp.palabra) as letras,
                palabras_a_letras(repeat(' ', length(dfp.palabra))) as "letrasRespuesta",
                eo.respuesta as respuesta
	          from areas a, ejercicios e, 
	               ejercicios_opciones eo,
	               diccionario_formar_palabras dfp 
	        where a.id  = e."areaId"  
	          and e.id = eo."ejercicioId"    
	          and eo.id = dfp."ejercicioOpcionesId"  
	        ORDER BY RANDOM()
	         LIMIT 4`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  //-------------------------DISCRIMINACION VISUAL-----------------------------//
  findDiccionarioDiscriminacionVisual() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH random_group AS
        (SELECT grupo
            FROM diccionario_discriminacion_visual
          group by grupo
          ORDER BY RANDOM() LIMIT 4),
        -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
        random_records as
        (select a.id as aid, 
                e.id,
                a.descripcion,
                eo.id as "ejercicioOpcionesId",
                ddv.palabra,
                ddv.grupo,
                eo.respuesta as respuesta
            FROM diccionario_discriminacion_visual ddv,
                areas                             a,
                ejercicios                        e,
                ejercicios_opciones               eo
          WHERE 1 = 1
            and grupo in (SELECT grupo FROM random_group)
            and a.id = e."areaId"
            and e.id = eo."ejercicioId"
            and eo.id = ddv."ejercicioOpcionesId"
          ORDER BY a.id, e.id, a.descripcion, ddv.id, ddv.grupo, RANDOM())

        -- Paso 3: Construye el objeto JSON
        SELECT rr.aid as "areaId", 
              rr.id as "ejercicioId",
              rr.descripcion as "descripcionEjercicio",
              rr."ejercicioOpcionesId",
              json_agg(rr.palabra) AS palabra,
              rr.respuesta
          FROM random_records rr
        GROUP BY rr.aid, rr.id, rr.descripcion, rr.respuesta, rr."ejercicioOpcionesId"`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  findDiccionarioDiscriminacionVisualV2() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH diccionario_discriminacion_visual AS
            (select ddv."ejercicioOpcionesId",
                    ddv.palabra               as opcion,
                    false                     as "estado",
                    ddv.grupo
              from diccionario_discriminacion_visual ddv)
          select a.id as "areaId",  
                 e.id as "ejercicioId",
                  a.descripcion as "descripcionEjercicio",
                  ddv."ejercicioOpcionesId",
                  json_agg(row_to_json(ddv)) AS palabras, eo.respuesta
            FROM ejercicios_opciones eo, 
                diccionario_discriminacion_visual ddv,
                areas a,
                ejercicios e
            where eo.id = ddv."ejercicioOpcionesId"
              and a.id = e."areaId"
              and e.id = eo."ejercicioId"
            GROUP BY a.id, e.id, ddv."ejercicioOpcionesId", a.descripcion, eo.respuesta
            ORDER BY RANDOM() LIMIT 4`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  //-------------------------DISCRIMINACION PALABRAS-----------------------------//
  findDiccionarioDiscriminacionPalabras() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        ` WITH random_group AS
          (SELECT grupo
              FROM diccionario_discriminacion_palabras
            group by grupo
            ORDER BY RANDOM() LIMIT 2),
          -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
          random_records as
          (select a.id as aid, 
                  e.id,
                  a.descripcion,
                  eo.id as "ejercicioOpcionesId",
                  ddp.palabra,
                  ddp.grupo,
                  eo.respuesta as respuesta
              FROM diccionario_discriminacion_palabras ddp,
                  areas                             a,
                  ejercicios                        e,
                  ejercicios_opciones               eo
            WHERE 1 = 1
              and grupo in (SELECT grupo FROM random_group)
              and a.id = e."areaId"
              and e.id = eo."ejercicioId"
              and eo.id = ddp."ejercicioOpcionesId"
            ORDER BY a.id, e.id, a.descripcion, ddp.id, ddp.grupo, RANDOM())

          -- Paso 3: Construye el objeto JSON
          SELECT rr.aid as "areaId",
          		   rr.id as "ejercicioId",
                 rr.descripcion as "descripcionEjercicio",
                 rr."ejercicioOpcionesId",
                 json_agg(rr.palabra) AS palabras,
                 rr.respuesta
            FROM random_records rr
          GROUP BY rr.aid, rr.id, rr.descripcion, rr.respuesta, rr."ejercicioOpcionesId"`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  findDiccionarioDiscriminacionPalabrasV2() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        ` WITH diccionario_discriminacion_palabras AS
            (select ddp."ejercicioOpcionesId",
                    ddp.palabra               as opcion,
                    false                     as "estado",
                    ddp.grupo
              from diccionario_discriminacion_palabras ddp )
          select a.id as "areaId", 
                 e.id as "ejercicioId",
                  a.descripcion as "descripcionEjercicio",
                  ddp."ejercicioOpcionesId",
                  json_agg(row_to_json(ddp)) AS palabras, eo.respuesta
            FROM ejercicios_opciones eo, 
                diccionario_discriminacion_palabras ddp,
                areas a,
                  ejercicios e
            where eo.id = ddp."ejercicioOpcionesId"
              and a.id = e."areaId"
              and e.id = eo."ejercicioId"
            GROUP BY a.id, e.id, ddp."ejercicioOpcionesId", a.descripcion, eo.respuesta
            ORDER BY RANDOM() LIMIT 2`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

 
}
