ALTER TABLE topicos
ADD
    COLUMN id_usuario BIGINT NOT NULL,
ADD
    CONSTRAINT fk_relation FOREIGN KEY (id_usuario) REFERENCES usuarios (id);