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
        `SELECT * 
          FROM diccionario_formar_palabras e 
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
        `WITH random_group AS (
          SELECT grupo
          FROM diccionario_discriminacion_visual
          group by grupo
          ORDER BY RANDOM()
          LIMIT 4
      )
        -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
        SELECT *
        FROM diccionario_discriminacion_visual
        WHERE grupo in (SELECT grupo FROM random_group)
        ORDER BY id, grupo, RANDOM()
        LIMIT 16`,
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
        `WITH random_group AS (
          SELECT grupo
          FROM diccionario_discriminacion_visual
          group by grupo
          ORDER BY RANDOM()
          LIMIT 4
      ),
        -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
        random_records as (SELECT *
        FROM diccionario_discriminacion_visual
        WHERE grupo in (SELECT grupo FROM random_group)
        ORDER BY id, grupo, RANDOM())
        -- Paso 3: Construye el objeto JSON
        SELECT json_agg(rr.palabra
            ) AS palabra,
            rr.respuesta
        FROM random_records rr
        GROUP BY rr.grupo, rr.respuesta
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

  //-------------------------DISCRIMINACION PALABRAS-----------------------------//
  findDiccionarioDiscriminacionPalabras() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH random_group AS (
          SELECT grupo
          FROM diccionario_discriminacion_palabras
          group by grupo
          ORDER BY RANDOM()
          LIMIT 2
      )
        -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
        SELECT *
        FROM diccionario_discriminacion_palabras
        WHERE grupo in (SELECT grupo FROM random_group)
        ORDER BY id, grupo, RANDOM()
        LIMIT 8 `,
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
        `SELECT * 
        FROM diccionario_discriminacion_palabras_v2 
        ORDER BY RANDOM()
        LIMIT 2`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  findDiccionarioDiscriminacionPalabrasV3() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH random_group AS (
          SELECT grupo
          FROM diccionario_discriminacion_palabras
          group by grupo
          ORDER BY RANDOM()
          LIMIT 2
      ),
        -- Paso 2: Selecciona 8 registros aleatorios de ese grupo
        random_records as (SELECT *
        FROM diccionario_discriminacion_palabras
        WHERE grupo in (SELECT grupo FROM random_group)
        ORDER BY id, grupo, RANDOM()
        LIMIT 8)
        -- Paso 3: Construlle el objeto JSON
        SELECT json_agg(rr.palabra
            ) AS palabra,
            rr.respuesta
        FROM random_records rr
        GROUP BY rr.grupo, rr.respuesta
        LIMIT 2`,
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
