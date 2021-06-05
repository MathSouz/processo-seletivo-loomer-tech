const express = require('express');
const router = express.Router();
const getQuerySQL = require('../utils/queryUtils')
const db = require("../database/init")
const auth = require('../middleware/auth')

router.post("/registrar", auth, (req, res, next) => {
    let body = req.body

    if(!body)
    {
        res.status(400).send("Sem corpo.")
        return;
    }

    if(!body.cep)
    {
        res.status(400).send("Sem CEP.")
        return;
    }

    if(!body.valor)
    {
        res.status(400).send("Sem valor.")
        return;
    }

    if(!body.disponivel)
    {
        body.disponivel = 1
    }

    db.run(getQuerySQL("insert_imovel"), [body.cep, body.numero, body.complemento, body.valor, body.qntQuarts, body.disponivel], function(err) {
        if(err)
        {
            res.status(400).send(err.message);
            return;
        }

        db.all("SELECT * FROM imovel WHERE id=?", [this.lastID], function(err, row)
        {
            if(row.length > 1)
            {
                res.status(403).send("O servidor tentou enviar mais dados do que deveria. Abortando...");
                return;
            }

            res.status(200).json(row[0]);
        })

    })
})

router.put("/alterar", auth, (req, res, next) => {
    let body = req.body

    if(!body)
    {
        res.status(400).send("Sem corpo.")
        return;
    }

    if(!req.query.id)
    {
        res.status(400).send("Sem imóvel específicado.")
        return;
    }

    var selectors = []
    var values = []

    if(req.body.cep)
    {
        values.push(req.body.cep)
        selectors.push(`cep=?`)
    }

    if(req.body.valor)
    {
        values.push(req.body.valor)
        selectors.push(`valor=?`)
    }

    if(req.body.numero)
    {
        values.push(req.body.numero)
        selectors.push(`numero=?`)
    }

    if(req.body.complemento)
    {
        values.push(req.body.complemento)
        selectors.push(`complemento=?`)
    }

    if(req.body.qntQuartos)
    {
        values.push(req.body.qntQuartos)
        selectors.push(`qntQuartos=?`)
    }

    if(req.body.disponivel)
    {
        values.push(req.body.disponivel)
        selectors.push(`disponivel=?`)
    }

    var sql = `UPDATE imovel SET ${selectors.join(",").toString()} WHERE id=?`;

    values.push(req.query.id)

    if(selectors.length == 0)
    {
        res.status(400).send("Nenhum parâmetro especificado para ser alterar.");
        return;
    }

    db.run(sql, values, function(err) {
        if(err)
        {
            res.status(400).send(err.message);
            return;
        }

        db.all("SELECT * FROM imovel WHERE id=?", [req.query.id], function(err, row)
        {
            if(row.length > 1)
            {
                res.status(403).send("O servidor tentou enviar mais dados do que deveria. Abortando...");
                return;
            }

            else if(row.length == 1)
            {
                res.status(200).json(row[0]);
            }

            else
            {
                res.status(404).send("Imovel especificado não pode ser alterado pois não existe.")
            }
        })
    })
})

router.get("/", auth, (req, res, next) => {

    db.all(getQuerySQL("select_imovel_all"), (err, rows) => {
        if(err)
        {
            res.status(400).send(err.message)
            return;
        }

        res.status(200).json(rows)
            
    })
})

router.get("/:id", auth, (req, res, next) => 
{
    db.all(getQuerySQL("select_imovel_by_id"), [req.params.id], (err, rows) => 
    {
        if(err)
        {
            res.status(400).send(err.message)
            return;
        }

        res.status(200).json(rows)
    })
})

router.delete("/:id", auth, (req, res, next) => {
    db.run(getQuerySQL("delete_imovel"), req.params.id, function(err) {
        if(err)
        {
            res.status(400).send(err.message)
            return;
        }

        if(this.changes > 0)
            res.status(200).send(`Imovél com ID ${req.params.id} foi removido com sucesso.`);
        else
            res.status(200).send(`Nada foi removido.`);
    })
})

module.exports = router