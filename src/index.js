const express = require('express')
const app = express()
require('dotenv/config')
const usuarioRoute = require("./routes/usuario")
const imovelRoute = require("./routes/imovel")

app.use(express.json())

app.use("/usuario", usuarioRoute)
app.use("/imovel", imovelRoute)

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor NodeJs aberto em ${port}.`);
})