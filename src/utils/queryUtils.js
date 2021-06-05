const fs = require('fs')

function getQuerySQL(file)
{
    return fs.readFileSync(`query/${file}.sql`).toString()
}

module.exports = getQuerySQL