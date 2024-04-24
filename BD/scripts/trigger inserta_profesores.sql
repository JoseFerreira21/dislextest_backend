CREATE OR REPLACE FUNCTION insertar_en_profesores()
RETURNS TRIGGER AS $$
BEGIN
    -- Definir el tipo de entidad según el rol del usuario
    IF NEW."tipoEntidad" = 'PR' THEN
        -- Insertar en la tabla de profesores
        INSERT INTO profesores ("entidadId", "curso")
        VALUES (NEW.id, null);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_inserta_profesores
AFTER INSERT ON entidades
FOR EACH ROW
EXECUTE FUNCTION insertar_en_profesores();