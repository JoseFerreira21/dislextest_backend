CREATE OR REPLACE FUNCTION insertar_en_entidades()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_inserta_entidades
AFTER INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION insertar_en_entidades();