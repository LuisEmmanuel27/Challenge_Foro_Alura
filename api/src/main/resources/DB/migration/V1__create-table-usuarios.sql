CREATE TABLE
    usuarios (
        id BIGINT NOT NULL AUTO_INCREMENT,
        login VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(300) NOT NULL,
        foto VARCHAR(100),
        PRIMARY KEY(id)
    );

CREATE TABLE
    topicos(
        id BIGINT NOT NULL AUTO_INCREMENT,
        titulo VARCHAR(200) NOT NULL,
        mensaje TEXT NOT NULL,
        fecha DATETIME NOT NULL,
        estatus BOOLEAN NOT NULL,
        tags VARCHAR(20) NOT NULL,
        curso VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE INDEX tags_index ON topicos (tags);

CREATE INDEX curso_index ON topicos (curso);