CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER      PRIMARY KEY AUTOINCREMENT
                           NOT NULL,
    nome      VARCHAR (50) NOT NULL,
    cpf       CHAR (11)    UNIQUE
                           NOT NULL,
    email     VARCHAR (24) UNIQUE
                           NOT NULL,
    senha     VARCHAR (25) NOT NULL
);