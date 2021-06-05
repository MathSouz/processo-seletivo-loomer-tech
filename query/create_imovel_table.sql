CREATE TABLE IF NOT EXISTS imovel (
    id          INTEGER        PRIMARY KEY AUTOINCREMENT NOT NULL,
    cep         CHAR (8)       NOT NULL,
    numero      INTEGER,
    complemento VARCHAR (256),
    valor       DECIMAL (9, 2) NOT NULL DEFAULT (0),
    qntQuartos  INTEGER,
    disponivel  BOOLEAN        NOT NULL DEFAULT (1) 
);
