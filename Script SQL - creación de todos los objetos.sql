-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(128) NOT NULL,
	"role" varchar NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id)
);


-- public.entidades definition

-- Drop table

-- DROP TABLE public.entidades;

CREATE TABLE public.entidades (
	id serial4 NOT NULL,
	"tipoEntidad" varchar(2) NOT NULL,
	nombre varchar(100) NOT NULL,
	apellido varchar(100) NULL,
	"fechaNacimiento" date NULL,
	sexo varchar(1) NULL,
	telefono varchar(20) NULL,
	direccion varchar(100) NULL,
	"nroDocumento" varchar(20) NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	"usuarioId" int4 NULL,
	CONSTRAINT "PK_4ceb23ee98193c241ee43c95111" PRIMARY KEY (id),
	CONSTRAINT "REL_3576956507d95e42dc53b05496" UNIQUE ("usuarioId"),
	CONSTRAINT "UQ_ca194395b8bbdafce2302f04d93" UNIQUE ("nroDocumento")
);

-- public.entidades foreign keys

ALTER TABLE public.entidades ADD CONSTRAINT "FK_3576956507d95e42dc53b05496f" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id);


-- public.profesores definition

-- Drop table

-- DROP TABLE public.profesores;

CREATE TABLE public.profesores (
	id serial4 NOT NULL,
	"entidadId" int4 NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_f9adeec6e0091d84e590711c517" PRIMARY KEY (id),
	CONSTRAINT "REL_6505a03d52b3875154708fde72" UNIQUE ("entidadId")
);


-- public.profesores foreign keys

ALTER TABLE public.profesores ADD CONSTRAINT "FK_6505a03d52b3875154708fde72e" FOREIGN KEY ("entidadId") REFERENCES public.entidades(id);


-- public.grados definition

-- Drop table

-- DROP TABLE public.grados;

CREATE TABLE public.grados (
	id serial4 NOT NULL,
	descripcion varchar(255) NOT NULL,
	CONSTRAINT "PK_d8003299e040a914f344e1a40ae" PRIMARY KEY (id)
);


-- public.instituciones definition

-- Drop table

-- DROP TABLE public.instituciones;

CREATE TABLE public.instituciones (
	id serial4 NOT NULL,
	tipo varchar(255) NOT NULL,
	descripcion varchar(255) NOT NULL,
	direccion varchar(255) NOT NULL,
	CONSTRAINT "PK_4be89b4d1536e4588a73f2247d8" PRIMARY KEY (id)
);

-- public.alumnos definition

-- Drop table

-- DROP TABLE public.alumnos;

CREATE TABLE public.alumnos (
	id serial4 NOT NULL,
	año int4 NOT NULL,
	"entidadId" int4 NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	"gradoId" int4 NULL,
	"institucionId" int4 NULL,
	"profesorId" int4 NULL,
	CONSTRAINT "PK_c9eecfa0d05424c7d272034a706" PRIMARY KEY (id),
	CONSTRAINT "REL_9e59c7f6758053845c89a90bd1" UNIQUE ("entidadId")
);


-- public.alumnos foreign keys

ALTER TABLE public.alumnos ADD CONSTRAINT "FK_131312970aafa1f132559ba007d" FOREIGN KEY ("gradoId") REFERENCES public.grados(id) ON DELETE SET NULL;
ALTER TABLE public.alumnos ADD CONSTRAINT "FK_2bb3fbfd63f823436a4c8b5c90e" FOREIGN KEY ("profesorId") REFERENCES public.profesores(id) ON DELETE CASCADE;
ALTER TABLE public.alumnos ADD CONSTRAINT "FK_9e59c7f6758053845c89a90bd1a" FOREIGN KEY ("entidadId") REFERENCES public.entidades(id) ON DELETE CASCADE;
ALTER TABLE public.alumnos ADD CONSTRAINT "FK_a51e47773c964758c5a92ce3bc0" FOREIGN KEY ("institucionId") REFERENCES public.instituciones(id) ON DELETE SET NULL;


-- public.areas definition

-- Drop table

-- DROP TABLE public.areas;

CREATE TABLE public.areas (
	id serial4 NOT NULL,
	descripcion varchar(100) NOT NULL,
	"pEsperado" int4 NOT NULL,
	"pMinimo" numeric(10, 2) NOT NULL,
	"observacionSR" varchar(200) NOT NULL,
	"observacionR" varchar(200) NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY (id)
);


-- public.resultado_test definition

-- Drop table

-- DROP TABLE public.resultado_test;

CREATE TABLE public.resultado_test (
	id serial4 NOT NULL,
	indicador varchar(2) NULL,
	observacion varchar(255) NULL,
	"tiempoTotal" int4 NOT NULL,
	"alumnoId" int4 NOT NULL,
	"profesorId" int4 NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_0c049dd40384c3a80ac0a89b5e7" PRIMARY KEY (id)
);


-- public.resultado_test foreign keys

ALTER TABLE public.resultado_test ADD CONSTRAINT "FK_19a52bbb2f16d37df319c02e788" FOREIGN KEY ("profesorId") REFERENCES public.profesores(id);
ALTER TABLE public.resultado_test ADD CONSTRAINT "FK_cf59e34e50561d1fdbba7427ac9" FOREIGN KEY ("alumnoId") REFERENCES public.alumnos(id);


-- public.resultado_item definition

-- Drop table

-- DROP TABLE public.resultado_item;

CREATE TABLE public.resultado_item (
	id serial4 NOT NULL,
	"pObtenido" int4 NOT NULL,
	indicador varchar(2) NULL,
	observacion varchar(255) NOT NULL,
	"tiempoEmpleado" int4 NOT NULL,
	"createAt" timestamptz DEFAULT now() NOT NULL,
	"updateAt" timestamptz DEFAULT now() NOT NULL,
	"areaId" int4 NULL,
	"resultadotestId" int4 NULL,
	CONSTRAINT "PK_3359f212bb13e957289fbb3b7ee" PRIMARY KEY (id)
);


-- public.resultado_item foreign keys

ALTER TABLE public.resultado_item ADD CONSTRAINT "FK_3a187738d0fbb3783da6f714aa6" FOREIGN KEY ("areaId") REFERENCES public.areas(id);
ALTER TABLE public.resultado_item ADD CONSTRAINT "FK_8e86a6d9adf262e36191b6b1993" FOREIGN KEY ("resultadotestId") REFERENCES public.resultado_test(id) ON DELETE CASCADE;

-- public.ejercicios definition

-- Drop table

-- DROP TABLE public.ejercicios;

CREATE TABLE public.ejercicios (
	id serial4 NOT NULL,
	"areaId" int4 NULL,
	CONSTRAINT "PK_b77292ecd4959c03cfccbc9ac31" PRIMARY KEY (id),
	CONSTRAINT "REL_baa3e53a8aac6eff8f14f97475" UNIQUE ("areaId")
);


-- public.ejercicios foreign keys

ALTER TABLE public.ejercicios ADD CONSTRAINT "FK_baa3e53a8aac6eff8f14f97475f" FOREIGN KEY ("areaId") REFERENCES public.areas(id);


-- public.ejercicios_opciones definition

-- Drop table

-- DROP TABLE public.ejercicios_opciones;

CREATE TABLE public.ejercicios_opciones (
	id serial4 NOT NULL,
	respuesta varchar(30) NOT NULL,
	"ejercicioId" int4 NULL,
	CONSTRAINT "PK_6d112eddacefbece4f2646cd287" PRIMARY KEY (id)
);


-- public.ejercicios_opciones foreign keys

ALTER TABLE public.ejercicios_opciones ADD CONSTRAINT "FK_49a827a5bf4bda4df7eb4842363" FOREIGN KEY ("ejercicioId") REFERENCES public.ejercicios(id);



-- public.resultado_ejercicios definition

-- Drop table

-- DROP TABLE public.resultado_ejercicios;

CREATE TABLE public.resultado_ejercicios (
	id serial4 NOT NULL,
	"respuestaRespondida" varchar(30) NOT NULL,
	acierto bool NOT NULL,
	"ejercicioId" int4 NULL,
	"ejercicioOpcionesId" int4 NULL,
	"alumnoId" int4 NULL,
	"resultadoitemId" int4 NULL,
	CONSTRAINT "PK_a2f80b10f5a960f3863472ea7a5" PRIMARY KEY (id)
);


-- public.resultado_ejercicios foreign keys

ALTER TABLE public.resultado_ejercicios ADD CONSTRAINT "FK_7dbb1c7d8bfc3a14f6a5a3e2338" FOREIGN KEY ("resultadoitemId") REFERENCES public.resultado_item(id);
ALTER TABLE public.resultado_ejercicios ADD CONSTRAINT "FK_cd07b5153209b2b74b532acaee2" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);
ALTER TABLE public.resultado_ejercicios ADD CONSTRAINT "FK_db7bc12eee01a604fbda6626e83" FOREIGN KEY ("alumnoId") REFERENCES public.alumnos(id);
ALTER TABLE public.resultado_ejercicios ADD CONSTRAINT "FK_ed24e882bcda7e8a6e6f17061fe" FOREIGN KEY ("ejercicioId") REFERENCES public.ejercicios(id);


-- public.diccionario_formar_palabras definition

-- Drop table

-- DROP TABLE public.diccionario_formar_palabras;

CREATE TABLE public.diccionario_formar_palabras (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_b94bfe76c98ddadbae1e23d1064" PRIMARY KEY (id)
);


-- public.diccionario_formar_palabras foreign keys

ALTER TABLE public.diccionario_formar_palabras ADD CONSTRAINT "FK_497b4eaa53d296c3d8cc625c740" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_discriminacion_palabras definition

-- Drop table

-- DROP TABLE public.diccionario_discriminacion_palabras;

CREATE TABLE public.diccionario_discriminacion_palabras (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	grupo int4 NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_ad2cacbd005a5ffddfdcb9e2efc" PRIMARY KEY (id)
);


-- public.diccionario_discriminacion_palabras foreign keys

ALTER TABLE public.diccionario_discriminacion_palabras ADD CONSTRAINT "FK_ba14b2f0c686e95a68bdfed03b2" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_discriminacion_visual definition

-- Drop table

-- DROP TABLE public.diccionario_discriminacion_visual;

CREATE TABLE public.diccionario_discriminacion_visual (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	grupo int4 NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_3bc2c4856bb1bd4449f6505c877" PRIMARY KEY (id)
);


-- public.diccionario_discriminacion_visual foreign keys

ALTER TABLE public.diccionario_discriminacion_visual ADD CONSTRAINT "FK_f37a768c651df7afaf53daa2ec8" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_encerrar_palabras definition

-- Drop table

-- DROP TABLE public.diccionario_encerrar_palabras;

CREATE TABLE public.diccionario_encerrar_palabras (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	grupo int4 NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_d163210b1ec8becfbdc8015c3b0" PRIMARY KEY (id)
);


-- public.diccionario_encerrar_palabras foreign keys

ALTER TABLE public.diccionario_encerrar_palabras ADD CONSTRAINT "FK_e71f0632266987b4ce61e0d4af1" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_letras_desordenadas definition

-- Drop table

-- DROP TABLE public.diccionario_letras_desordenadas;

CREATE TABLE public.diccionario_letras_desordenadas (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_6c4d5e1cd998636d897771dfcf9" PRIMARY KEY (id)
);


-- public.diccionario_letras_desordenadas foreign keys

ALTER TABLE public.diccionario_letras_desordenadas ADD CONSTRAINT "FK_ef0823dd54cef88faa74cfcd098" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_contar_letras definition

-- Drop table

-- DROP TABLE public.diccionario_contar_letras;

CREATE TABLE public.diccionario_contar_letras (
	id serial4 NOT NULL,
	letra varchar(1) NOT NULL,
	cantidad varchar(30) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_720c9927940cf5ed04af35ba9be" PRIMARY KEY (id)
);


-- public.diccionario_contar_letras foreign keys

ALTER TABLE public.diccionario_contar_letras ADD CONSTRAINT "FK_bf444d183f974884011966fb090" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_encerrar_silabas_cf definition

-- Drop table

-- DROP TABLE public.diccionario_encerrar_silabas_cf;

CREATE TABLE public.diccionario_encerrar_silabas_cf (
	id serial4 NOT NULL,
	opciones jsonb NULL,
	palabra varchar(255) NOT NULL,
	"palabraIncompleta" varchar(255) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_371d898e32bfe9964c22d49e922" PRIMARY KEY (id)
);


-- public.diccionario_encerrar_silabas_cf foreign keys

ALTER TABLE public.diccionario_encerrar_silabas_cf ADD CONSTRAINT "FK_26ab098532374b5fcc21350c8ba" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_encerrar_silabas_cs definition

-- Drop table

-- DROP TABLE public.diccionario_encerrar_silabas_cs;

CREATE TABLE public.diccionario_encerrar_silabas_cs (
	id serial4 NOT NULL,
	opciones jsonb NULL,
	palabra varchar(255) NOT NULL,
	"palabraIncompleta" varchar(255) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_53753bd005674eb799a6b79134a" PRIMARY KEY (id)
);


-- public.diccionario_encerrar_silabas_cs foreign keys

ALTER TABLE public.diccionario_encerrar_silabas_cs ADD CONSTRAINT "FK_53f6e61edf9b1b96e13a1e780f9" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_encontrar_letras definition

-- Drop table

-- DROP TABLE public.diccionario_encontrar_letras;

CREATE TABLE public.diccionario_encontrar_letras (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	grupo int4 NOT NULL,
	cantidad int4 NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_4cc28c5fb5eba8d9389b0157985" PRIMARY KEY (id)
);


-- public.diccionario_encontrar_letras foreign keys

ALTER TABLE public.diccionario_encontrar_letras ADD CONSTRAINT "FK_230d2d0a24a8a7eab6b8c08d1cf" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);


-- public.diccionario_izquierda_derecha definition

-- Drop table

-- DROP TABLE public.diccionario_izquierda_derecha;

CREATE TABLE public.diccionario_izquierda_derecha (
	id serial4 NOT NULL,
	palabra varchar(30) NOT NULL,
	posicion varchar(30) NOT NULL,
	"ejercicioOpcionesId" int4 NULL,
	CONSTRAINT "PK_0a25dd6d70e5d1af1e9da8c97e4" PRIMARY KEY (id)
);


-- public.diccionario_izquierda_derecha foreign keys

ALTER TABLE public.diccionario_izquierda_derecha ADD CONSTRAINT "FK_c420cd466b69a558aaee17c9c05" FOREIGN KEY ("ejercicioOpcionesId") REFERENCES public.ejercicios_opciones(id);



-- DROP FUNCTION public.insertar_en_entidades();

CREATE OR REPLACE FUNCTION public.insertar_en_entidades()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
        BEGIN
            -- Definir el tipo de entidad según el rol del usuario
            CASE NEW.role
            WHEN 'admin' THEN
                    INSERT INTO entidades ("tipoEntidad", "nombre", "apellido", "fechaNacimiento", "sexo", "telefono", "direccion", "nroDocumento", "usuarioId")
                    VALUES ('AD', NEW.name, null, null, null, null, null, null, NEW.id);
            WHEN 'profesor' THEN
                    INSERT INTO entidades ("tipoEntidad", "nombre", "apellido", "fechaNacimiento", "sexo", "telefono", "direccion", "nroDocumento", "usuarioId")
                    VALUES ('PR', NEW.name, null, null, null, null, null, null,  NEW.id);
            END CASE;
            
            RETURN NEW;
        END;
        $function$
;


-- DROP FUNCTION public.insertar_en_profesores();

CREATE OR REPLACE FUNCTION public.insertar_en_profesores()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
        BEGIN
            -- Definir el tipo de entidad según el rol del usuario
            IF NEW."tipoEntidad" = 'PR' THEN
                -- Insertar en la tabla de profesores
                INSERT INTO profesores ("entidadId")
                VALUES (NEW.id);
            END IF;
            
            RETURN NEW;
        END;
        $function$
;


-- DROP FUNCTION public.get_indicador_riesgo_dislexia(int4);

CREATE OR REPLACE FUNCTION public.get_indicador_riesgo_dislexia(p_resultadotestid integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
    DECLARE
        v_indicador TEXT;
    BEGIN
        SELECT 
            CASE 
                WHEN SUM("pObtenido") < 17.4 THEN
                    'R'
                ELSE 
                    'SR'	
            END
        INTO v_indicador
        FROM resultado_item ri
        WHERE ri."resultadotestId" = p_resultadotestId
        GROUP BY ri."resultadotestId";

        RETURN v_indicador;
    END;
    $function$
;


-- DROP FUNCTION public.get_observacion_riesgo_dislexia(int4);

CREATE OR REPLACE FUNCTION public.get_observacion_riesgo_dislexia(p_resultadotestid integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
    DECLARE
        v_resultado TEXT;
        cur_resultado CURSOR FOR 
            WITH tab_puntos AS (
                SELECT 
                    ri."resultadotestId",
                    CASE 
                        WHEN SUM("pObtenido") < 17.4 THEN
                            'El / La niño/a tiene riesgo de dislexia porque obtuvo bajo rendimiento en las áreas de '
                        ELSE 
                            'El / La niño/a no tiene riesgo de dislexia'	
                    END AS observacion, 
                    CASE 
                        WHEN SUM("pObtenido") < 17.4 THEN
                            'R'
                        ELSE 
                            'SR'	
                    END AS indicador 
                FROM resultado_item ri
                WHERE ri."resultadotestId" = p_resultadotestId
                GROUP BY ri."resultadotestId"
            ),
            tab_riesgo AS (
                SELECT 
                    STRING_AGG(t.descripcion, ', ') AS descripcion,
                    t."resultadotestId"
                FROM (
                    SELECT 
                        ri."resultadotestId",
                        CASE 
                            WHEN SUM(ri."pObtenido") < 4.2 THEN
                                'Discriminación visual'
                            ELSE 
                                ''
                        END AS descripcion
                    FROM resultado_item ri
                    JOIN tab_puntos ON ri."resultadotestId" = tab_puntos."resultadotestId"
                    WHERE ri."areaId" IN (2, 8)
                    GROUP BY ri."resultadotestId", tab_puntos.indicador

                    UNION 

                    SELECT 
                        ri."resultadotestId",
                        a.descripcion
                    FROM resultado_item ri
                    JOIN areas a ON ri."areaId" = a.id
                    JOIN tab_puntos ON ri."resultadotestId" = tab_puntos."resultadotestId"
                    WHERE ri.indicador = 'R'
                        AND ri."areaId" NOT IN (2, 8)
                ) AS t
                GROUP BY t."resultadotestId"
            )
            SELECT 
                case 
                    when tab_puntos.indicador = 'R' then
                tab_puntos.observacion || ' ' || tab_riesgo.descripcion ||  ' y estas áreas son de suma importancia para el aprendizaje de la lecto escritura'
                else
                tab_puntos.observacion
                end resultado
            FROM tab_puntos
            JOIN tab_riesgo ON tab_puntos."resultadotestId" = tab_riesgo."resultadotestId";

    BEGIN
        -- Abre el cursor y recupera el resultado
        OPEN cur_resultado;
        FETCH cur_resultado INTO v_resultado;
        CLOSE cur_resultado;

        RETURN v_resultado;
    END;
    $function$
;


-- DROP FUNCTION public.palabras_a_letras(text);

CREATE OR REPLACE FUNCTION public.palabras_a_letras(palabra text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        v_letras JSONB := '[]'::jsonb;
        v_letra CHAR;
    BEGIN
        -- Loop through each character in the word
        FOR i IN 1..length(palabra) LOOP
            v_letra := substr(palabra, i, 1);
            -- Append each letter as a JSON object to the array
            v_letras := v_letras || jsonb_build_object('letra', v_letra, 'estado', false);
        END LOOP;
        RETURN v_letras;  -- Aquí devolvemos la variable correcta
    END;
    $function$
;


-- DROP FUNCTION public.palabras_a_letras_v2(text, text);

CREATE OR REPLACE FUNCTION public.palabras_a_letras_v2(palabra text, letra_correcta text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
    DECLARE
        v_letras JSONB := '[]'::jsonb;
        v_letra CHAR;
        v_valido BOOLEAN;
    BEGIN
        -- Loop through each character in the word
        FOR i IN 1..length(palabra) LOOP
            v_letra := substr(palabra, i, 1);
            -- Determine if the current letter matches the correct letter
            v_valido := v_letra = letra_correcta;
            -- Append each letter as a JSON object to the array
            v_letras := v_letras || jsonb_build_object('letra', v_letra, 'estado', false, 'valido', v_valido);
        END LOOP;
        RETURN v_letras;
    END;
    $function$
;


-- Table Triggers

create trigger trigger_inserta_profesores after
insert
    on
    public.entidades for each row execute function insertar_en_profesores();



-- Table Triggers

create trigger trigger_inserta_entidades after
insert
    on
    public.usuarios for each row execute function insertar_en_entidades();
   
   
   
INSERT INTO areas(descripcion, "pEsperado", "pMinimo", "observacionSR", "observacionR")
	VALUES ('Formar palabras', 4, 2.4, 'El / La niño/a tiene un buen rendimiento en el area de Formar palabras.', 'El / La niño/a está con bajo rendimiento en el área de Formar palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Discriminación visual encerrar palabras', 4, 2.4, 'El / La niño/a tiene un buen rendimiento en el area de Discriminación visual encerrar palabras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación visual encerrar palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Discriminación de palabras', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Discriminación de palabras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación de palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Encontrar letras en palabras', 7, 4.2, 'El / La niño/a tiene un buen rendimiento en el area de Encontrar letras en palabras.', 'El / La niño/a está con bajo rendimiento en el área de Encontrar letras en palabras, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Nombre correcto de una imagen', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Nombre correcto de una imagen.', 'El / La niño/a está con bajo rendimiento en el área de Nombre correcto de una imagen, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Letras desordenadas', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Letras desordenadas.', 'El / La niño/a está con bajo rendimiento en el área de Letras desordenadas, es conveniente que acuda a un profesional para recibir ayuda.' ),
		   ('Conciencia Silabica', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Conciencia Silabica.', 'El / La niño/a está con bajo rendimiento en el área de Conciencia Silabica, es conveniente que acuda a un profesional para recibir ayuda.'),
           ('Discriminación visual contar letras', 3, 1.8, 'El/ La niño/a tiene un buen rendimiento en el area de Discriminación visual contar letras.', 'El / La niño/a está con bajo rendimiento en el área de Discriminación visual contar letras, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Conciencia Fonológica', 2, 1.2, 'El / La niño/a tiene un buen rendimiento en el area de Conciencia Fonológica.', 'El / La niño/a está con bajo rendimiento en el área de Conciencia Fonológica, es conveniente que acuda a un profesional para recibir ayuda.'),
		   ('Lateralidad', 1, 0.6, 'El / La niño/a tiene un buen rendimiento en el area de Lateralidad.', 'El / La niño/a está con bajo rendimiento en el área de Lateralidad, es conveniente que acuda a un profesional para recibir ayuda.');
		  
		  
		  
INSERT INTO ejercicios
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
            (10);
           
           
INSERT INTO ejercicios_opciones
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
            ('caballo', 3), --20
            ('a', 4), --21
            ('p', 4), --22
            ('t', 4), --23
            ('c', 4), --24
            ('f', 4), --25
            ('r', 4), --26
            ('elefante', 5), --27
            ('tigre', 5), --28
            ('perro', 5), --29
            ('caballo', 5), --30
            ('ratón', 5), --31
            ('tortuga', 5), --32
            ('gusano', 5), --33
            ('conejo', 5), --34
            ('gallina', 6), --35
            ('ganso', 6), --36
            ('pollo', 6), --37
            ('paloma', 6), --38
            ('águila', 6), --39
            ('pavo', 6), --40
            ('tu', 7), --41
            ('fa', 7), --42
            ('bu', 7), --43
            ('mu', 7), --44
            ('ga', 7), --45
            ('ze', 7), --46
            ('ca', 7), --47
            (8, 8), --48
            (3, 8), --49
            (6, 8), --50 
            ('mar', 9), --51
            ('dri', 9), --52
            ('ser', 9), --53
            ('derecha', 10), --54
            ('izquierda', 10), --55
            ('derecha', 10), --56
            ('izquierda', 10); --57       
            

INSERT INTO diccionario_formar_palabras
        (palabra, "ejercicioOpcionesId")
        VALUES
            ('gtao', 1),
            ('prreo', 2),
            ('lóen', 3),
            ('spao', 4),
            ('rolo', 5),
            ('nomo', 6),
            ('aran', 7),
            ('acav', 8),
            ('caof', 9),
            ('toap', 10); 
           
           
INSERT INTO diccionario_discriminacion_visual
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
        ('codricolo', 6, 16); 
       


INSERT INTO diccionario_discriminacion_palabras
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
            ('caballo', 4, 20);
           
           
           
INSERT INTO diccionario_encontrar_letras
    (palabra,  grupo, cantidad,  "ejercicioOpcionesId")
    VALUES
        ('gallo', 1, 4, 21),
        ('pato', 1, 4, 21),
        ('cabra', 1,  4, 21),
        ('perro', 2, 3, 22),
        ('sapo', 2, 3, 22),
        ('pez', 2, 3, 22),
        ('tigre', 3, 4, 23),
        ('tortuga', 3, 4, 23),
        ('pato', 3, 4, 23),
        ('cerdo', 4, 3, 24),
        ('vaca', 4, 3, 24),
        ('conejo', 4, 3, 24),
        ('elefante', 5, 3, 25),
        ('jirafa', 5, 3, 25),
        ('foca', 5, 3, 25), 
        ('tortuga', 6, 4, 26),
        ('ratón', 6, 4, 26),
        ('perro', 6, 4, 26);
       
       
INSERT INTO diccionario_encerrar_palabras
    (palabra, grupo, "ejercicioOpcionesId")
    VALUES
        ('efalente', 1, 27),
        ('enlefante', 1, 27),
        ('elefante', 1, 27),
        ('tgrie', 2, 28),
        ('tigre', 2, 28),
        ('tiegr', 2, 28),
        ('peorro', 3, 29),
        ('perro', 3, 29),
        ('perrro', 3, 29),
        ('caballo', 4, 30),
        ('cavallo', 4, 30),
        ('cballo', 4, 30),
        ('rátón', 5, 31),
        ('ratón', 5, 31),
        ('raton', 5, 31),
        ('tortgua', 6, 32),
        ('tortua', 6, 32),
        ('tortuga', 6, 32),
        ('guzano', 7, 33),
        ('gusano', 7, 33),
        ('gusamo', 7, 33),
        ('conejo', 8, 34),
        ('conjeo', 8, 34),
        ('coneho', 8, 34);
       

       
INSERT INTO diccionario_letras_desordenadas
    (palabra, "ejercicioOpcionesId")
    VALUES
        ('ilaagnl', 35),
        ('angso', 36),
        ('ollpo', 37),
        ('lapoma', 38),
        ('galuiá', 39),
        ('ovap', 40); 
       
       
       
INSERT INTO diccionario_encerrar_silabas_cs 
    (opciones, palabra, "palabraIncompleta", "ejercicioOpcionesId")
     VALUES
        ('["ta", "te", "ti", "to", "tu"]', 'tortuga', 'tor_ _ga', 41),
        ('["fa", "fe", "fi", "fo", "fu"]', 'jirafa', 'jira_ _', 42),
        ('["ba", "be", "bi", "bo", "bu"]', 'tiburon', 'ti_ _ron', 43),
        ('["ma", "me", "mi", "mo", "mu"]', 'murciélago', '_ _rciélago', 44),
        ('["ga", "ge", "gi", "go", "gu"]', 'gato', '_ _to', 45),
        ('["za", "ze", "zi", "zo", "zu"]', 'zebra', '_ _bra', 46),
        ('["ca", "ce", "ci", "co", "cu"]', 'camello', '_ _mello', 47); 
       
       
       
INSERT INTO diccionario_contar_letras
        (cantidad, letra, "ejercicioOpcionesId")
        VALUES
        (8, 'p', 48),
        (3, 'b', 49),
        (6, 'd', 50);
       
       
INSERT INTO diccionario_encerrar_silabas_cf 
    (opciones, palabra, "palabraIncompleta", "ejercicioOpcionesId")
    VALUES
        ('["ram", "arm", "mar"]', 'mariposa', '_ _ _iposa', 51),
        ('["rid", "dri", "dir"]', 'cocodrilo', 'coco_ _ _lo', 52),
        ('["ser", "res", "ers"]', 'serpiente', '_ _ _piente', 53); 
       
       
INSERT INTO diccionario_izquierda_derecha
        (palabra,  posicion,  "ejercicioOpcionesId")
        VALUES
            ('flor', 'derecha', 54),
            ('auto', 'izquierda', 55),
            ('pelota', 'derecha', 56),
            ('bicicleta', 'izquierda', 57);       

           
INSERT INTO grados
    ("descripcion")
    VALUES
        ('SEGUNDO GRADO - T.M.'),
        ('SEGUNDO GRADO - T.T.'),
        ('TERCER GRADO - T.M.'),
        ('TERCER GRADO - T.T.'),
        ('CUARTO GRADO - T.M.'),
        ('CUARTO GRADO - T.T.');
        

INSERT INTO instituciones
    ("tipo", "descripcion", "direccion")
    VALUES
        ('PÚBLICO', '3053 SAN CARLOS', 'KM 7,5 ACARAY,  75 a 9 ACARAY CIUDAD DEL ESTE ALTO PARANA.');       
        
       
       
       
-- v_resultados source
CREATE OR REPLACE VIEW v_resultados
AS WITH ritem AS (
        SELECT ri."resultadotestId" AS id,
            ri.id AS "itemId",
            areas.id AS id_area,
            areas."pMinimo",
            ri."pObtenido",
            areas."pEsperado",
            ri.indicador,
            ri.observacion
        FROM areas,
            resultado_item ri
        WHERE areas.id = ri."areaId"
        ORDER BY ri."resultadotestId" DESC, areas.id
        ), resultado_test AS (
        SELECT rt.id,
            alu.id AS id_alumno,
            (enti.nombre::text || ' '::text) || enti.apellido::text AS nombre_alumno,
            enti."nroDocumento" AS nro_documento,
            date_part('year'::text, now()) - date_part('year'::text, enti."fechaNacimiento") AS edad,
            enti.sexo,
            i.descripcion as institucion,
            g.descripcion as grado,
            --rt.indicador,
            get_indicador_riesgo_dislexia(rt.id) as indicador,
            --rt.observacion,
            get_observacion_riesgo_dislexia(rt.id) as observacion,
            to_char(rt."createAt", 'DD-MM-YYYY HH24:MI:SS') AS fecha_hora_test,
            to_char(('00:00:00'::time without time zone + '00:00:01'::interval * floor((rt."tiempoTotal" / 1000)::double precision) + '00:00:00.001'::interval * (rt."tiempoTotal" % 1000)::double precision)::interval, 'HH24:MI:SS'::text) AS tiempo_total
        FROM public.resultado_test rt
            JOIN alumnos alu ON rt."alumnoId" = alu.id
            LEFT JOIN entidades enti ON alu."entidadId" = enti.id
            LEFT JOIN instituciones i ON alu."institucionId" = i.id
            LEFT JOIN grados g ON alu."gradoId" = g.id
        )
SELECT 1 AS id,
    resultado_test.id AS id_resultadotest,
    resultado_test.id_alumno,
    resultado_test.nombre_alumno,
    resultado_test.nro_documento,
    resultado_test.edad,
    resultado_test.sexo,
    resultado_test.institucion,
    resultado_test.grado,
    resultado_test.indicador,
    resultado_test.observacion,
    resultado_test.fecha_hora_test,
    resultado_test.tiempo_total,
    formar_palabras.id_area AS fp_area_id,
    formar_palabras."itemId" AS fp_item_id,
    formar_palabras."pObtenido" AS fp_pobtenido,
    formar_palabras."pMinimo" AS fp_pminimo,
    formar_palabras."pEsperado" AS fp_pesperado,
    formar_palabras.indicador AS fp_indicador,
    formar_palabras.observacion AS fp_observacion,
    discrim_visual_a.id_area AS dva_area_id,
    discrim_visual_a."itemId" AS dva_item_id,
    discrim_visual_a."pObtenido" AS dva_pobtenido,
    discrim_visual_a."pMinimo" AS dva_pminimo,
    discrim_visual_a."pEsperado" AS dva_pesperado,
    discrim_visual_a.indicador AS dva_indicador,
    discrim_visual_a.observacion AS dva_observacion,
    discrim_palabras.id_area AS dp_area_id,
    discrim_palabras."itemId" AS dp_item_id,
    discrim_palabras."pObtenido" AS dp_pobtenido,
    discrim_palabras."pMinimo" AS dp_pminimo,
    discrim_palabras."pEsperado" AS dp_pesperado,
    discrim_palabras.indicador AS dp_indicador,
    discrim_palabras.observacion AS dp_observacion,
    enc_letr_palabras.id_area AS elp_area_id,
    enc_letr_palabras."itemId" AS elp_item_id,
    enc_letr_palabras."pObtenido" AS elp_pobtenido,
    enc_letr_palabras."pMinimo" AS elp_pminimo,
    enc_letr_palabras."pEsperado" AS elp_pesperado,
    enc_letr_palabras.indicador AS elp_indicador,
    enc_letr_palabras.observacion AS elp_observacion,
    nombre_correcto.id_area AS nc_area_id,
    nombre_correcto."itemId" AS nc_item_id,
    nombre_correcto."pObtenido" AS nc_pobtenido,
    nombre_correcto."pMinimo" AS nc_pminimo,
    nombre_correcto."pEsperado" AS nc_pesperado,
    nombre_correcto.indicador AS nc_indicador,
    nombre_correcto.observacion AS nc_observacion,
    letras_desord.id_area AS ld_area_id,
    letras_desord."itemId" AS ld_item_id,
    letras_desord."pObtenido" AS ld_pobtenido,
    letras_desord."pMinimo" AS ld_pminimo,
    letras_desord."pEsperado" AS ld_pesperado,
    letras_desord.indicador AS ld_indicador,
    letras_desord.observacion AS ld_observacion,
    discrim_visual_b.id_area AS dvb_area_id,
    discrim_visual_b."itemId" AS dvb_item_id,
    discrim_visual_b."pObtenido" AS dvb_pobtenido,
    discrim_visual_b."pMinimo" AS dvb_pminimo,
    discrim_visual_b."pEsperado" AS dvb_pesperado,
    discrim_visual_b.indicador AS dvb_indicador,
    discrim_visual_b.observacion AS dvb_observacion,
    conc_silabica.id_area AS cs_area_id,
    conc_silabica."itemId" AS cs_item_id,
    conc_silabica."pObtenido" AS cs_pobtenido,
    conc_silabica."pMinimo" AS cs_pminimo,
    conc_silabica."pEsperado" AS cs_pesperado,
    conc_silabica.indicador AS cs_indicador,
    conc_silabica.observacion AS cs_observacion,
    conc_fonologica.id_area AS cf_id,
    conc_fonologica."itemId" AS cf_item_id,
    conc_fonologica."pObtenido" AS cf_pobtenido,
    conc_fonologica."pMinimo" AS cf_pminimo,
    conc_fonologica."pEsperado" AS cf_pesperado,
    conc_fonologica.indicador AS cf_indicador,
    conc_fonologica.observacion AS cf_observacion,
    derecha_izquierda.id_area AS di_area_id,
    derecha_izquierda."itemId" AS di_item_id,
    derecha_izquierda."pObtenido" AS di_pobtenido,
    derecha_izquierda."pMinimo" AS di_pminimo,
    derecha_izquierda."pEsperado" AS di_pesperado,
    derecha_izquierda.indicador AS di_indicador,
    derecha_izquierda.observacion AS di_observacion
FROM resultado_test
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 1) formar_palabras ON resultado_test.id = formar_palabras.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 2) discrim_visual_a ON resultado_test.id = discrim_visual_a.id
    LEFT JOIN ( SELECT ritem.id,
            ritem.id_area,
            ritem."itemId",
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 3) discrim_palabras ON resultado_test.id = discrim_palabras.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 4) enc_letr_palabras ON resultado_test.id = enc_letr_palabras.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 5) nombre_correcto ON resultado_test.id = nombre_correcto.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 6) letras_desord ON resultado_test.id = letras_desord.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 7) conc_silabica ON resultado_test.id = conc_silabica.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 8) discrim_visual_b ON resultado_test.id = discrim_visual_b.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 9) conc_fonologica ON resultado_test.id = conc_fonologica.id
    LEFT JOIN ( SELECT ritem.id,
            ritem."itemId",
            ritem.id_area,
            ritem."pObtenido",
            ritem."pMinimo",
            ritem."pEsperado",
            ritem.indicador,
            ritem.observacion
        FROM ritem
        WHERE ritem.id_area = 10) derecha_izquierda ON resultado_test.id = derecha_izquierda.id;       