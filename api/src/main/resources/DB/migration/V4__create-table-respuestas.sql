CREATE TABLE
    respuestas (
        id BIGINT NOT NULL AUTO_INCREMENT,
        mensaje TEXT NOT NULL,
        fecha DATETIME NOT NULL,
        activo TINYINT NOT NULL,
        id_usuario BIGINT NOT NULL,
        id_topico BIGINT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
        FOREIGN KEY (id_topico) REFERENCES topicos (id)
    );