CREATE or replace VIEW public.v_resultados AS
WITH ritem AS
 (SELECT ri."resultadotestId" AS id,
         areas.id              AS id_area,
         ri."pObtenido",
         areas."pEsperado",
         ri.indicador,
         ri.observacion
    FROM areas, resultado_item ri
   WHERE (areas.id = ri."areaId")
   ORDER BY ri."resultadotestId" DESC, areas.id),
resultado_test AS
 (SELECT rt.id,
         alu.id AS id_alumno,
         (((enti.nombre) ::text || ' ' ::text) || (enti.apellido) ::text) AS nombre_alumno,
         enti."nroDocumento" as nro_documento,
         date_part('year', now()) - date_part('year', enti."fechaNacimiento") as edad,
         rt.indicador,
         rt.observacion
    FROM resultado_test rt, alumnos alu, entidades enti
   WHERE ((rt."alumnoId" = alu.id) AND (alu."entidadId" = enti.id)))
SELECT 1                             AS id,
       resultado_test.id             AS id_resultadotest,
       resultado_test.id_alumno,
       resultado_test.nombre_alumno,
       resultado_test.nro_documento,
       resultado_test.edad,
       formar_palabras.id_area       AS fp_id,
       formar_palabras."pObtenido"   AS fp_pobtenido,
       formar_palabras."pEsperado"   AS fp_pesperado,
       formar_palabras.indicador     AS fp_indicador,
       formar_palabras.observacion   AS fp_observacion,
       discrim_visual_a.id_area      AS dva_id,
       discrim_visual_a."pObtenido"  AS dva_pobtenido,
       discrim_visual_a."pEsperado"  AS dva_pesperado,
       discrim_visual_a.indicador    AS dva_indicador,
       discrim_visual_a.observacion  AS dva_observacion,
       discrim_palabras.id_area      AS dp_id,
       discrim_palabras."pObtenido"  AS dp_pobtenido,
       discrim_palabras."pEsperado"  AS dp_pesperado,
       discrim_palabras.indicador    AS dp_indicador,
       discrim_palabras.observacion  AS dp_observacion,
       enc_letr_palabras.id_area     AS elp_id,
       enc_letr_palabras."pObtenido" AS elp_pobtenido,
       enc_letr_palabras."pEsperado" AS elp_pesperado,
       enc_letr_palabras.indicador   AS elp_indicador,
       enc_letr_palabras.observacion AS elp_observacion,
       nombre_correcto.id_area       AS nc_id,
       nombre_correcto."pObtenido"   AS nc_pobtenido,
       nombre_correcto."pEsperado"   AS nc_pesperado,
       nombre_correcto.indicador     AS nc_indicador,
       nombre_correcto.observacion   AS nc_observacion,
       letras_desord.id_area         AS ld_id,
       letras_desord."pObtenido"     AS ld_pobtenido,
       letras_desord."pEsperado"     AS ld_pesperado,
       letras_desord.indicador       AS ld_indicador,
       letras_desord.observacion     AS ld_observacion,
       discrim_visual_b.id_area      AS dvb_id,
       discrim_visual_b."pObtenido"  AS dvb_pobtenido,
       discrim_visual_b."pEsperado"  AS dvb_pesperado,
       discrim_visual_b.indicador    AS dvb_indicador,
       discrim_visual_b.observacion  AS dvb_observacion,
       conc_silabica.id_area         AS cs_id,
       conc_silabica."pObtenido"     AS cs_pobtenido,
       conc_silabica."pEsperado"     AS cs_pesperado,
       conc_silabica.indicador       AS cs_indicador,
       conc_silabica.observacion     AS cs_observacion,
       conc_fonologica.id_area       AS cf_id,
       conc_fonologica."pObtenido"   AS cf_pobtenido,
       conc_fonologica."pEsperado"   AS cf_pesperado,
       conc_fonologica.indicador     AS cf_indicador,
       conc_fonologica.observacion   AS cf_observacion,
       derecha_izquierda.id_area     AS di_id,
       derecha_izquierda."pObtenido" AS di_pobtenido,
       derecha_izquierda."pEsperado" AS di_pesperado,
       derecha_izquierda.indicador   AS di_indicador,
       derecha_izquierda.observacion AS di_observacion,
       resultado_test.indicador,
       resultado_test.observacion
  FROM resultado_test,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 1)) formar_palabras,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 2)) discrim_visual_a,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 3)) discrim_palabras,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 4)) enc_letr_palabras,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 5)) nombre_correcto,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 6)) letras_desord,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 7)) discrim_visual_b,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 8)) conc_silabica,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 9)) conc_fonologica,
       (SELECT ritem.id,
               ritem.id_area,
               ritem."pObtenido",
               ritem."pEsperado",
               ritem.indicador,
               ritem.observacion
          FROM ritem
         WHERE (ritem.id_area = 10)) derecha_izquierda
 WHERE ((resultado_test.id = formar_palabras.id) AND
       (resultado_test.id = discrim_visual_a.id) AND
       (resultado_test.id = discrim_palabras.id) AND
       (resultado_test.id = enc_letr_palabras.id) AND
       (resultado_test.id = nombre_correcto.id) AND
       (resultado_test.id = discrim_visual_b.id) AND
       (resultado_test.id = letras_desord.id) AND
       (resultado_test.id = conc_silabica.id) AND
       (resultado_test.id = conc_fonologica.id) and
       (resultado_test.id = derecha_izquierda.id))