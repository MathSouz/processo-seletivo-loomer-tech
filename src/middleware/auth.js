const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = (req, res, next) => {
    if(!req.headers)
    {
        res.status(400).send("Sem cabeçalho.")
        return;
    }

    if(!req.headers.authorization)
    {
        res.status(400).send("Sem campo de autorização.")
        return;
    }

    const bearer = req.headers.authorization.split(" ")

    if(bearer.length != 2 && bearer[0] != "Bearer" || !bearer[1])
    {
        res.status(400).send("Bearer inválido.")
        return;
    }

    const token = bearer[1]

    if(jwt.verify(token, process.env.JWT_SECRET))
    {
        next()
    }

    else
    {
        res.status(401).send("Token inválido.")
    }
}