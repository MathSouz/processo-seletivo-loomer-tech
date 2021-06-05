const express = require('express');
const router = express.Router();
const getQuerySQL = require('../utils/queryUtils')
const signToken = require('../utils/jwtUtils')
const db = require("../database/init")
const bcrypt = require('bcrypt')

router.put("/auth", (req, res) => {
    if(!req.body)
    {
        res.status(400).send("Sem corpo.")
        return;
    }

    if(!req.body.email)
    {
        res.status(400).send("Sem email.")
        return;
    }

    if(!req.body.senha)
    {
        res.status(400).send("Sem senha.")
        return;
    }

    db.all(getQuerySQL("select_usuario_password_by_email"), [req.body.email], (err, rows) => {

        if(err)
        {
            res.status(400).send(err)
            return;
        }

        if(rows.length == 0)
        {
            res.status(401).send("Credenciais incorretas.")
            return
        }

        if(rows.length > 1)
        {
            res.status(203).send("O servidor enviou mais dados que o esperado. Abortando...");
            return;
        }

        if(bcrypt.compareSync(req.body.senha, rows[0].senha))
        {
            var result = rows[0]
            result.token = signToken(result.id)
            result.senha = undefined;
            res.status(200).json(result)
        }

        else
        {
            res.status(401).send("Credenciais incorretas.")
        }
    })
})

router.post("/registrar", (req, res) => {
    var body = req.body;

    if(!body)
    {
        res.status(400).send("Sem corpo.")
        return;
    }

    if(!body.nome)
    {
        res.status(400).send("Sem nome.")
        return;
    }

    if(!body.cpf)
    {
        res.status(400).send("Sem CPF.")
        return;
    }

    if(!body.email)
    {
        res.status(400).send("Sem email.")
        return;
    }

    if(!body.senha)
    {
        res.status(400).send("Sem senha.")
        return;
    }

    const insertUserSQL = getQuerySQL("insert_usuario")

    bcrypt.hash(req.body.senha, 1, (err, encrypt) => {
        
        body.senha = encrypt;

        db.run(insertUserSQL, [body.nome, body.cpf, body.email, body.senha], function(err) {
        
            if(err)
            {
                res.status(400).send(err)
                return;
            }
    
            body.senha = undefined;
            body.token = signToken(this.lastID)
            res.status(200).json(body);
        })
    })
})

module.exports = router