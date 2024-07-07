import {MigrationInterface, QueryRunner} from "typeorm";

export class init1719365524021 implements MigrationInterface {
    name = 'init1719365524021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "diccionario_formar_palabras" ("id" SERIAL NOT NULL, "palabra" character varying(30) NOT NULL, "ejercicioOpcionesId" integer, CONSTRAINT "PK_b94bfe76c98ddadbae1e23d1064" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_ejercicios" ("id" SERIAL NOT NULL, "respuestaRespondida" character varying(30) NOT NULL, "acierto" boolean NOT NULL, "ejercicioId" integer, "ejercicioOpcionesId" integer, "alumnoId" integer, "resultadoitemId" integer, CONSTRAINT "PK_a2f80b10f5a960f3863472ea7a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diccionario_discriminacion_visual" ("id" SERIAL NOT NULL, "palabra" character varying(30) NOT NULL, "grupo" integer NOT NULL, "ejercicioOpcionesId" integer, CONSTRAINT "PK_3bc2c4856bb1bd4449f6505c877" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diccionario_discriminacion_palabras" ("id" SERIAL NOT NULL, "palabra" character varying(30) NOT NULL, "grupo" integer NOT NULL, "ejercicioOpcionesId" integer, CONSTRAINT "PK_ad2cacbd005a5ffddfdcb9e2efc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ejercicios_opciones" ("id" SERIAL NOT NULL, "respuesta" character varying(30) NOT NULL, "ejercicioId" integer, CONSTRAINT "PK_6d112eddacefbece4f2646cd287" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ejercicios" ("id" SERIAL NOT NULL, "areaId" integer, CONSTRAINT "REL_baa3e53a8aac6eff8f14f97475" UNIQUE ("areaId"), CONSTRAINT "PK_b77292ecd4959c03cfccbc9ac31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "areas" ("id" SERIAL NOT NULL, "descripcion" character varying(100) NOT NULL, "pEsperado" integer NOT NULL, "pMinimo" numeric(10,2) NOT NULL, "observacionSR" character varying(200) NOT NULL, "observacionR" character varying(200) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_item" ("id" SERIAL NOT NULL, "pObtenido" integer NOT NULL, "indicador" character varying(2), "observacion" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "areaId" integer, "resultadotestId" integer, CONSTRAINT "PK_3359f212bb13e957289fbb3b7ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_test" ("id" SERIAL NOT NULL, "indicador" character varying(1), "observacion" character varying(255), "alumnoId" integer NOT NULL, "profesorId" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0c049dd40384c3a80ac0a89b5e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profesores" ("id" SERIAL NOT NULL, "entidadId" integer NOT NULL, "curso" character varying(50), "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_6505a03d52b3875154708fde72" UNIQUE ("entidadId"), CONSTRAINT "PK_f9adeec6e0091d84e590711c517" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(128) NOT NULL, "role" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entidades" ("id" SERIAL NOT NULL, "tipoEntidad" character varying(2) NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100), "fechaNacimiento" date, "telefono" character varying(20), "direccion" character varying(100), "nroDocumento" character varying(20), "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "UQ_ca194395b8bbdafce2302f04d93" UNIQUE ("nroDocumento"), CONSTRAINT "REL_3576956507d95e42dc53b05496" UNIQUE ("usuarioId"), CONSTRAINT "PK_4ceb23ee98193c241ee43c95111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alumnos" ("id" SERIAL NOT NULL, "entidadId" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profesorId" integer, CONSTRAINT "REL_9e59c7f6758053845c89a90bd1" UNIQUE ("entidadId"), CONSTRAINT "PK_c9eecfa0d05424c7d272034a706" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "diccionario_formar_palabras" ADD CONSTRAINT "FK_497b4eaa53d296c3d8cc625c740" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES "ejercicios_opciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" ADD CONSTRAINT "FK_ed24e882bcda7e8a6e6f17061fe" FOREIGN KEY ("ejercicioId") REFERENCES "ejercicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" ADD CONSTRAINT "FK_cd07b5153209b2b74b532acaee2" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES "ejercicios_opciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" ADD CONSTRAINT "FK_db7bc12eee01a604fbda6626e83" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" ADD CONSTRAINT "FK_7dbb1c7d8bfc3a14f6a5a3e2338" FOREIGN KEY ("resultadoitemId") REFERENCES "resultado_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diccionario_discriminacion_visual" ADD CONSTRAINT "FK_f37a768c651df7afaf53daa2ec8" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES "ejercicios_opciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diccionario_discriminacion_palabras" ADD CONSTRAINT "FK_ba14b2f0c686e95a68bdfed03b2" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES "ejercicios_opciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ejercicios_opciones" ADD CONSTRAINT "FK_49a827a5bf4bda4df7eb4842363" FOREIGN KEY ("ejercicioId") REFERENCES "ejercicios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ejercicios" ADD CONSTRAINT "FK_baa3e53a8aac6eff8f14f97475f" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_item" ADD CONSTRAINT "FK_3a187738d0fbb3783da6f714aa6" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_item" ADD CONSTRAINT "FK_8e86a6d9adf262e36191b6b1993" FOREIGN KEY ("resultadotestId") REFERENCES "resultado_test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_test" ADD CONSTRAINT "FK_cf59e34e50561d1fdbba7427ac9" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_test" ADD CONSTRAINT "FK_19a52bbb2f16d37df319c02e788" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profesores" ADD CONSTRAINT "FK_6505a03d52b3875154708fde72e" FOREIGN KEY ("entidadId") REFERENCES "entidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entidades" ADD CONSTRAINT "FK_3576956507d95e42dc53b05496f" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alumnos" ADD CONSTRAINT "FK_2bb3fbfd63f823436a4c8b5c90e" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alumnos" ADD CONSTRAINT "FK_9e59c7f6758053845c89a90bd1a" FOREIGN KEY ("entidadId") REFERENCES "entidades"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION public.insertar_en_entidades()
                                RETURNS trigger
                                LANGUAGE plpgsql
                                AS $function$
                                BEGIN
                                    -- Definir el tipo de entidad según el rol del usuario
                                    CASE NEW.role
                                    WHEN 'admin' THEN
                                            INSERT INTO entidades ("tipoEntidad", "nombre", "apellido", "fechaNacimiento", "telefono", "direccion", "nroDocumento", "usuarioId")
                                            VALUES ('AD', NEW.name, null, null, null, null, null, NEW.id);
                                    WHEN 'profesor' THEN
                                            INSERT INTO entidades ("tipoEntidad", "nombre", "apellido", "fechaNacimiento", "telefono", "direccion", "nroDocumento", "usuarioId")
                                            VALUES ('PR', NEW.name, null, null, null, null, null,  NEW.id);
                                    END CASE;
                                    
                                    RETURN NEW;
                                END;
                                $function$`);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION public.insertar_en_profesores()
                                RETURNS trigger
                                LANGUAGE plpgsql
                                AS $function$
                                BEGIN
                                    -- Definir el tipo de entidad según el rol del usuario
                                    IF NEW."tipoEntidad" = 'PR' THEN
                                        -- Insertar en la tabla de profesores
                                        INSERT INTO profesores ("entidadId", "curso")
                                        VALUES (NEW.id, null);
                                    END IF;
                                    
                                    RETURN NEW;
                                END;
                                $function$`);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION palabras_a_letras(palabra TEXT)
                                    RETURNS JSONB AS $$
                                    DECLARE
                                        letras JSONB := '[]'::jsonb;
                                        letra CHAR;
                                    BEGIN
                                        -- Loop through each character in the word
                                        FOR i IN 1..length(palabra) LOOP
                                            letra := substr(palabra, i, 1);
                                            -- Append each letter as a JSON object to the array
                                            letras := letras || jsonb_build_object('letra', letra, 'estado', false);
                                        END LOOP;
                                        RETURN letras;
                                    END;
                                    $$ LANGUAGE plpgsql`);                        
        await queryRunner.query(`create trigger trigger_inserta_profesores after
                                insert
                                    on
                                    public.entidades for each row execute function insertar_en_profesores()`);
        await queryRunner.query(`create trigger trigger_inserta_entidades after
                                insert
                                    on
                                    public.usuarios for each row execute function insertar_en_entidades()`);
        await queryRunner.query(`INSERT INTO public.areas(
								descripcion, "pEsperado", "pMinimo", "observacionSR", "observacionR")
								VALUES ('Formar palabras', 4, 2.4, 'El / La niño/a tiene un buen rendimiento en el area de Formar palabras.', 'El / La niño/a está con bajo rendimiento en el área de Formar palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Discriminación visual encerrar palabras', 4, 2.4, 'El / La niño/a tiene un buen rendimiento en el area de Discriminación visual encerrar palabras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación visual encerrar palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Discriminación de palabras', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Discriminación de palabras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación de palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Encontrar letras en palabras', 7, 4.2, 'El / La niño/a tiene un buen rendimiento en el area de Encontrar letras en palabras.', 'El / La niño/a está con bajo rendimiento en el área de Encontrar letras en palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Nombre correcto de una imagen', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Nombre correcto de una imagen.', 'El / La niño/a está con bajo rendimiento en el área de Encontrar letras en palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Letras desordenadas', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Letras desordenadas.', 'El / La niño/a está con bajo rendimiento en el área de Letras desordenadas, es conveniente que acuda a un profesional para recibir ayuda.' ),
									   ('Discriminación visual contar palabras', 3, 1.8, 'El/ La niño/a tiene un buen rendimiento en el area de Discriminación visual contar palabras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación visual contar palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Conciencia Silabica', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Conciencia Silabica.', 'El / La niño/a está con bajo rendimiento en el área de Conciencia Silabica, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Conciencia Fonológica', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Conciencia Fonológica.', 'El / La niño/a está con bajo rendimiento en el área de Conciencia Fonológica, es conveniente que acuda a un profesional para recibir ayuda.'),
									   ('Derecha e Izquierda', 1, 0.6, 'El / La niño/a tiene un buen rendimiento en el area de Derecha e Izquierda.', 'El / La niño/a está con bajo rendimiento en el área de Derecha e Izquierda, es conveniente que acuda a un profesional para recibir ayuda.')`);
        await queryRunner.query(`INSERT INTO public.ejercicios
                                ("areaId")
                                VALUES
                                    (1),
                                    (2),
                                    (3),
                                    (4),
                                    (5),
                                    (6),
                                    (7),
                                    (8),
                                    (9),
                                    (10)`);
        await queryRunner.query(`INSERT INTO public.ejercicios_opciones
                                ("respuesta", "ejercicioId")
                                VALUES
                                    ('gato', 1), --1
                                    ('perro', 1), --2
                                    ('león', 1), --3
                                    ('sapo', 1), --4
                                    ('loro', 1), --5
                                    ('mono', 1), --6
                                    ('rana', 1), --7
                                    ('vaca', 1), --8
                                    ('foca', 1), --9
                                    ('pato', 1), --10
                                    ('ratón', 2), --11
                                    ('gallo', 2), --12
                                    ('conejo', 2), --13 
                                    ('león', 2), --14
                                    ('vaca', 2), --15
                                    ('cocodrilo', 2), --16
                                    ('gusano', 3), --17
                                    ('tortuga', 3), --18
                                    ('elefante', 3), --19
                                    ('caballo', 3) --20
                                    `);


        await queryRunner.query(`INSERT INTO public.diccionario_formar_palabras
                                (palabra, "ejercicioOpcionesId")
                                VALUES
                                    ('gtao', 1),
                                    ('prreo', 2),
                                    ('león', 3),
                                    ('spao', 4),
                                    ('rolo', 5),
                                    ('nomo', 6),
                                    ('aran', 7),
                                    ('cava', 8),
                                    ('caof', 9),
                                    ('ptoa', 10)`); 
                                    
        await queryRunner.query(`INSERT INTO public.diccionario_discriminacion_visual
                                (palabra, grupo, "ejercicioOpcionesId")
                                VALUES
                                    ('rtaón', 1, 11),
                                    ('ratón', 1, 11),
                                    ('rantó', 1, 11),
                                    ('glloa', 2, 12),
                                    ('golla', 2, 12),
                                    ('gallo', 2, 12),
                                    ('conejo', 3, 13),
                                    ('cenojo', 3, 13),
                                    ('conoje', 3, 13),
                                    ('lóen', 4, 14),
                                    ('león', 4, 14),
                                    ('lnóe', 4, 14),
                                    ('cava', 5, 15),
                                    ('avac', 5, 15),
                                    ('vaca', 5, 15),
                                    ('dricocolo', 6, 16),
                                    ('cocodrilo', 6, 16),
                                    ('codricolo', 6, 16)`); 
                                    
        await queryRunner.query(`INSERT INTO public.diccionario_discriminacion_palabras
                                (palabra,  grupo,  "ejercicioOpcionesId")
                                VALUES
                                    ('golazo', 1, 17),
                                    ('guisado', 1, 17),
                                    ('gusano', 1, 17),
                                    ('goma', 1, 17),
                                    ('tierra', 2, 18),
                                    ('tortuga', 2, 18),
                                    ('tienda', 2, 18),
                                    ('torunda', 2, 18),
                                    ('elefante', 3, 19),
                                    ('elegante', 3, 19),
                                    ('elemento', 3, 19),
                                    ('estante', 3, 19),
                                    ('cabello', 4, 20),
                                    ('bello', 4, 20),
                                    ('cebolla', 4, 20), 
                                    ('caballo', 4, 20)`); 

        await queryRunner.query(`CREATE or replace VIEW v_resultados AS
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
                                    (resultado_test.id = derecha_izquierda.id))`);                                     
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alumnos" DROP CONSTRAINT "FK_9e59c7f6758053845c89a90bd1a"`);
        await queryRunner.query(`ALTER TABLE "alumnos" DROP CONSTRAINT "FK_2bb3fbfd63f823436a4c8b5c90e"`);
        await queryRunner.query(`ALTER TABLE "entidades" DROP CONSTRAINT "FK_3576956507d95e42dc53b05496f"`);
        await queryRunner.query(`ALTER TABLE "profesores" DROP CONSTRAINT "FK_6505a03d52b3875154708fde72e"`);
        await queryRunner.query(`ALTER TABLE "resultado_test" DROP CONSTRAINT "FK_19a52bbb2f16d37df319c02e788"`);
        await queryRunner.query(`ALTER TABLE "resultado_test" DROP CONSTRAINT "FK_cf59e34e50561d1fdbba7427ac9"`);
        await queryRunner.query(`ALTER TABLE "resultado_item" DROP CONSTRAINT "FK_8e86a6d9adf262e36191b6b1993"`);
        await queryRunner.query(`ALTER TABLE "resultado_item" DROP CONSTRAINT "FK_3a187738d0fbb3783da6f714aa6"`);
        await queryRunner.query(`ALTER TABLE "ejercicios" DROP CONSTRAINT "FK_baa3e53a8aac6eff8f14f97475f"`);
        await queryRunner.query(`ALTER TABLE "ejercicios_opciones" DROP CONSTRAINT "FK_49a827a5bf4bda4df7eb4842363"`);
        await queryRunner.query(`ALTER TABLE "diccionario_discriminacion_palabras" DROP CONSTRAINT "FK_ba14b2f0c686e95a68bdfed03b2"`);
        await queryRunner.query(`ALTER TABLE "diccionario_discriminacion_visual" DROP CONSTRAINT "FK_f37a768c651df7afaf53daa2ec8"`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" DROP CONSTRAINT "FK_7dbb1c7d8bfc3a14f6a5a3e2338"`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" DROP CONSTRAINT "FK_db7bc12eee01a604fbda6626e83"`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" DROP CONSTRAINT "FK_cd07b5153209b2b74b532acaee2"`);
        await queryRunner.query(`ALTER TABLE "resultado_ejercicios" DROP CONSTRAINT "FK_ed24e882bcda7e8a6e6f17061fe"`);
        await queryRunner.query(`ALTER TABLE "diccionario_formar_palabras" DROP CONSTRAINT "FK_497b4eaa53d296c3d8cc625c740"`);
        await queryRunner.query(`DROP TABLE "alumnos"`);
        await queryRunner.query(`DROP TABLE "entidades"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "profesores"`);
        await queryRunner.query(`DROP TABLE "resultado_test"`);
        await queryRunner.query(`DROP TABLE "resultado_item"`);
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP TABLE "ejercicios"`);
        await queryRunner.query(`DROP TABLE "ejercicios_opciones"`);
        await queryRunner.query(`DROP TABLE "diccionario_discriminacion_palabras"`);
        await queryRunner.query(`DROP TABLE "diccionario_discriminacion_visual"`);
        await queryRunner.query(`DROP TABLE "resultado_ejercicios"`);
        await queryRunner.query(`DROP TABLE "diccionario_formar_palabras"`);
    }

}
