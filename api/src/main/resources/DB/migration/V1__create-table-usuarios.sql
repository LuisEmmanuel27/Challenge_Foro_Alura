CREATE TABLE
    usuarios (
        id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        correo VARCHAR(100) NOT NULL UNIQUE,
        contraseña VARCHAR(50) NOT NULL,
        foto VARCHAR(100)
    );

CREATE TABLE
    topicos(
        id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        mensaje TEXT NOT NULL,
        time DATETIME NOT NULL,
        estatus BOOLEAN NOT NULL,
        tags VARCHAR(20) NOT NULL,
        curso VARCHAR(20) NOT NULL
    );

CREATE INDEX tags_index ON topicos (tags);

CREATE INDEX curso_index ON topicos (curso);

CREATE TABLE
    usuarios_topicos(
        usuario_id BIGINT,
        topico_id BIGINT,
        PRIMARY KEY (usuario_id, topico_id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
        FOREIGN KEY (topico_id) REFERENCES topicos (id)
    );