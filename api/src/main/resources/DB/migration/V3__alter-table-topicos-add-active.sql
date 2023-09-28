ALTER TABLE topicos ADD activo TINYINT NOT NULL;

UPDATE topicos SET activo = 1;