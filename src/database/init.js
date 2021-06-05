const sqlite = require('sqlite3').verbose()
const getQuerySQL = require('../utils/queryUtils')

var db = new sqlite.Database("database.db", (err) => {
    if(err) return;
    db.run(getQuerySQL("create_usuario_table"))
    db.run(getQuerySQL("create_imovel_table"))
})

module.exports = db