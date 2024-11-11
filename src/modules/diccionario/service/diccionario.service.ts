import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';


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

  //#2-------------------------DISCRIMINACION VISUAL-----------------------------//
  findDiccionarioDiscriminacionVisual() {
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

  //#3-------------------------DISCRIMINACION PALABRAS-----------------------------//
  findDiccionarioDiscriminacionPalabras() {
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

  //#4-------------------------ENCONTRAR LETRAS EN PALABRAS-----------------------------//
  findDiccionarioEncontrarLetras() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
                 ` WITH random_group_1 AS (
                    SELECT "ejercicioOpcionesId"
                    FROM diccionario_encontrar_letras
                    WHERE cantidad = 3
                    GROUP BY "ejercicioOpcionesId"
                    HAVING COUNT(*) >= 3
                    ORDER BY RANDOM()
                    LIMIT 1),
                            random_group_2 AS (
                                SELECT "ejercicioOpcionesId"
                                FROM diccionario_encontrar_letras
                                WHERE cantidad = 4
                                GROUP BY "ejercicioOpcionesId"
                                HAVING COUNT(*) >= 3
                                ORDER BY RANDOM()
                                LIMIT 1
                            )
                            SELECT a.id as "areaId", 
                                  e.id as "ejercicioId", 
                                  a.descripcion  as "descripcionEjercicio",
                                del."ejercicioOpcionesId",
                                  del.palabra as palabra,
                                  palabras_a_letras_v2(del.palabra, eo.respuesta) as letras,
                                  palabras_a_letras_v2(repeat(' ', length(del.palabra)), '.') as "letrasRespuesta",
                                  eo.respuesta as respuesta
                            FROM random_group_1 rg,
                              diccionario_encontrar_letras del,
                              areas a, 
                              ejercicios e, 
                                ejercicios_opciones eo	
                            WHERE del."ejercicioOpcionesId" = rg."ejercicioOpcionesId"
                              and a.id  = e."areaId"  
                              and e.id = eo."ejercicioId"    
                              and eo.id = del."ejercicioOpcionesId" 
                            union all 
                            SELECT a.id as "areaId", 
                                e.id as "ejercicioId", 
                                a.descripcion  as "descripcionEjercicio",
                                del."ejercicioOpcionesId",
                                  del.palabra as palabra,
                                  palabras_a_letras_v2(del.palabra, eo.respuesta) as letras,
                                  palabras_a_letras_v2(repeat(' ', length(del.palabra)), '.') as "letrasRespuesta",
                                  eo.respuesta as respuesta
                            FROM random_group_2 rg,
                              diccionario_encontrar_letras del,
                              areas a, 
                              ejercicios e, 
                                ejercicios_opciones eo	
                            WHERE del."ejercicioOpcionesId" = rg."ejercicioOpcionesId"
                              and a.id  = e."areaId"  
                              and e.id = eo."ejercicioId"    
                              and eo.id = del."ejercicioOpcionesId"`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  findDiccionarioEncontrarLetrasV2() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH random_group_1 AS (
          SELECT "ejercicioOpcionesId",
          	     3 puntos
          FROM diccionario_encontrar_letras
          WHERE cantidad = 3
          GROUP BY "ejercicioOpcionesId"
          HAVING COUNT(*) >= 3
          ORDER BY RANDOM()
          LIMIT 1
      ), 
      random_group_2 AS (
          SELECT "ejercicioOpcionesId",
                 4 puntos
          FROM diccionario_encontrar_letras
          WHERE cantidad = 4
          GROUP BY "ejercicioOpcionesId"
          HAVING COUNT(*) >= 3
          ORDER BY RANDOM()
          LIMIT 1
      ),
      diccionario_encontrar_letras as (
          select del."ejercicioOpcionesId",
          		 rg.puntos,
                  del.palabra,
                  palabras_a_letras_v2(del.palabra, eo.respuesta) as letras,
                  del.grupo
            from diccionario_encontrar_letras del,
                 ejercicios_opciones eo, 
            random_group_1 rg
            where del."ejercicioOpcionesId" = rg."ejercicioOpcionesId" 
              and eo.id = del."ejercicioOpcionesId"
            union all  
            select del."ejercicioOpcionesId",
                   rg.puntos,
            	   del.palabra,
                   palabras_a_letras_v2(del.palabra, eo.respuesta) as letras,
                   del.grupo
            from diccionario_encontrar_letras del,
                 ejercicios_opciones eo, 
            random_group_2 rg
            where del."ejercicioOpcionesId" = rg."ejercicioOpcionesId" 
              and eo.id = del."ejercicioOpcionesId")
        select a.id as "areaId",  
              e.id as "ejercicioId",
              a.descripcion as "descripcionEjercicio",
              del."ejercicioOpcionesId",
              del.puntos,
              json_agg(row_to_json(del)) AS palabras, 
              eo.respuesta
      from ejercicios_opciones eo, 
           diccionario_encontrar_letras del,
           areas a,
           ejercicios e
      where eo.id = del."ejercicioOpcionesId"
        and a.id = e."areaId"
        and e.id = eo."ejercicioId"
      group by a.id, e.id, del."ejercicioOpcionesId", puntos, a.descripcion, eo.respuesta`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }

  ///#5--------------------------ENCERRAR PALABRAS-----------------------------//
  findDiccionarioEncerrarPalabra() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH diccionario_encerrar_palabras AS
            (select dep."ejercicioOpcionesId",
                    dep.palabra               as opcion,
                    false                     as "estado",
                    dep.grupo
              from diccionario_encerrar_palabras dep)
          select a.id as "areaId",  
                 e.id as "ejercicioId",
                  a.descripcion as "descripcionEjercicio",
                  dep."ejercicioOpcionesId",
                  json_agg(row_to_json(dep)) AS palabras, eo.respuesta
            FROM ejercicios_opciones eo, 
                diccionario_encerrar_palabras dep,
                areas a,
                ejercicios e
            where eo.id = dep."ejercicioOpcionesId"
              and a.id = e."areaId"
              and e.id = eo."ejercicioId"
            GROUP BY a.id, e.id, dep."ejercicioOpcionesId", a.descripcion, eo.respuesta
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

  ///#6--------------------------LETRAS DESORDENADAS-----------------------------//
  findDiccionarioLetrasDesordenadas() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `select a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                dld."ejercicioOpcionesId",
                dld.palabra as palabra,
                palabras_a_letras(dld.palabra) as letras,
                palabras_a_letras(repeat(' ', length(dld.palabra))) as "letrasRespuesta",
                eo.respuesta as respuesta
	          from areas a, ejercicios e, 
	               ejercicios_opciones eo,
	               diccionario_letras_desordenadas dld 
	        where a.id  = e."areaId"  
	          and e.id = eo."ejercicioId"    
	          and eo.id = dld."ejercicioOpcionesId"  
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

  ///#7--------------------------ENCERRAR SILABAS CONCIENCIA SILABICA-----------------------------//
  findDiccionarioEncerrarSilabasCS() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `SELECT a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                descs."ejercicioOpcionesId",
                descs.palabra,
                descs."palabraIncompleta",
                descs.opciones,
                eo.respuesta as respuesta
          FROM diccionario_encerrar_silabas_cs descs,  
              areas a, 
              ejercicios e, 
            ejercicios_opciones eo
          WHERE a.id  = e."areaId"  
                    and e.id = eo."ejercicioId"    
                    and eo.id = descs."ejercicioOpcionesId"  
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


  ///#8--------------------------CONTAR LETRAS-----------------------------//
  findDiccionarioContarLetras() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `select a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                dcl."ejercicioOpcionesId",
                dcl.letra as letra,
                dcl.cantidad as cantidad,
                eo.respuesta as respuesta
              from areas a, ejercicios e, 
                  ejercicios_opciones eo,
                  diccionario_contar_letras dcl 
            where a.id  = e."areaId"  
              and e.id = eo."ejercicioId"    
              and eo.id = dcl."ejercicioOpcionesId"
              order by dcl."ejercicioOpcionesId"`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        },
      );
    });
  }



  ///#9--------------------------ENCERRAR SILABAS CONCIENCIA FONOLOGICA-----------------------------//
  findDiccionarioEncerrarSilabasCF() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        ` SELECT a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                descf."ejercicioOpcionesId",
                descf.palabra,
                descf."palabraIncompleta",
                descf.opciones,
                eo.respuesta as respuesta
          FROM diccionario_encerrar_silabas_cf descf,  
              areas a, 
              ejercicios e, 
            ejercicios_opciones eo
          WHERE a.id  = e."areaId"  
              and e.id = eo."ejercicioId"    
              and eo.id = descf."ejercicioOpcionesId"
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

  ///#10--------------------------IZQUIERDA DERECHA-----------------------------//
  findDiccionarioIzquierdaDerecha() {
    return new Promise((resolve, reject) => {
      this.clientPg.query(
        `WITH diccionario_izquierda as 
         (SELECT a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                did."ejercicioOpcionesId",
                did.palabra,
                did.posicion ,
                eo.respuesta as respuesta
          FROM diccionario_izquierda_derecha did,  
              areas a, 
              ejercicios e, 
            ejercicios_opciones eo
          WHERE a.id  = e."areaId"  
              and e.id = eo."ejercicioId"    
              and eo.id = did."ejercicioOpcionesId"  
              and did.posicion = 'izquierda'
        ORDER BY RANDOM()
        LIMIT 1),
        diccionario_derecha as
        (SELECT a.id as "areaId", 
                e.id as "ejercicioId", 
                a.descripcion  as "descripcionEjercicio",
                did."ejercicioOpcionesId",
                did.palabra ,
                did.posicion ,
                eo.respuesta as respuesta
          FROM diccionario_izquierda_derecha did,  
              areas a, 
              ejercicios e, 
            ejercicios_opciones eo
          WHERE a.id  = e."areaId"  
              and e.id = eo."ejercicioId"    
              and eo.id = did."ejercicioOpcionesId"  
              and did.posicion = 'derecha'
        ORDER BY RANDOM()
        LIMIT 1)
        SELECT * FROM diccionario_izquierda
        UNION 
        SELECT * FROM diccionario_derecha
        ORDER BY posicion desc`,
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
