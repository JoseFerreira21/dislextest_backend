begin;
  create table diccionario_formar_palabras(id integer,
                                           palabra character varying(20),
                                           respuesta character varying(20));

  create table diccionario_discriminacion_visual(id integer,
                                                 palabra character
                                                 varying(20),
                                                 respuesta character
                                                 varying(20),
                                                 grupo integer);

  create table diccionario_discriminacion_palabras(id integer,
                                                   palabra character
                                                   varying(20),
                                                   respuesta character
                                                   varying(20),
                                                   grupo integer);

  create table diccionario_discriminacion_palabras_v2(id integer,
                                                      palabras character
                                                      varying(500),
                                                      respuesta character
                                                      varying(20));

  insert into diccionario_formar_palabras
    (id, palabra, respuesta)
  values
    (1, 'gato', 'gato'),
    (2, 'perro', 'perro'),
    (3, 'león', 'león'),
    (4, 'sapo', 'sapo'),
    (5, 'loro', 'loro'),
    (6, 'mono', 'mono'),
    (7, 'rana', 'rana'),
    (8, 'vaca', 'vaca'),
    (9, 'foca', 'foca'),
    (10, 'pato', 'pato');

  insert into diccionario_discriminacion_visual
    (id, palabra, respuesta, grupo)
  values
    (1, 'rtaón', 'ratón', 1),
    (2, 'ratón', 'ratón', 1),
    (3, 'rantó', 'ratón', 1),
    (4, 'glloa', 'gallo', 2),
    (5, 'golla', 'gallo', 2),
    (6, 'gallo', 'gallo', 2),
    (7, 'conejo', 'conejo', 3),
    (8, 'cenojo', 'conejo', 3),
    (9, 'conoje', 'conejo', 3),
    (10, 'loen', 'leon', 4),
    (11, 'leon', 'leon', 4),
    (12, 'leon', 'leon', 4),
    (13, 'cava', 'vaca', 5),
    (14, 'avac', 'vaca', 5),
    (15, 'vaca', 'vaca', 5),
    (16, 'dricocolo', 'cocodrilo', 6),
    (17, 'codricolo', 'cocodrilo', 6),
    (18, 'cocodrilo', 'cocodrilo', 6);

  insert into diccionario_discriminacion_palabras
    (id, palabra, respuesta, grupo)
  values
    (1, 'golazo', 'gusano', 1),
    (2, 'guisado', 'gusano', 1),
    (3, 'gusano', 'gusano', 1), --tercera posicion
    (4, 'goma', 'gusano', 1),
    (5, 'tierra', 'tortuga', 2),
    (6, 'tortuga', 'tortuga', 2), -- segunda posicion
    (7, 'tienda', 'tortuga', 2),
    (8, 'torunda', 'tortuga', 2),
    (9, 'elefante', 'elefante', 3), --primera posicion
    (10, 'elegante', 'elefante', 3),
    (11, 'elemento', 'elefante', 3),
    (12, 'estante', 'elefante', 3),
    (13, 'cabello', 'caballo', 4),
    (14, 'bello', 'caballo', 4),
    (15, 'cabeza', 'caballo', 4),
    (16, 'caballo', 'caballo', 4); --cuarta posicion

  insert into diccionario_discriminacion_palabras_v2
    (id, palabras, respuesta)
  values
    (1, '[''golazo'', ''guisado'', ''gusano'', ''goma'']', 'gusano'),
    (2, '[''tierra'', ''tortuga'', ''tienda'', ''torunda'']', 'tortuga'),
    (3, '[''elefante'', ''elemento'', ''elegante'', ''elemento'']', 'elefante'),
    (4, '[''cabello'', ''bello'', ''cabeza'', ''caballo'']', 'elefante');
end;
