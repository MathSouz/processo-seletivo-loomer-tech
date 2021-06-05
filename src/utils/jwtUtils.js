require('dotenv/config')
const jwt = require('jsonwebtoken')

function signToken(id)
{
    return jwt.sign({id: id}, process.env.JWT_SECRET);
}

module.exports = signToken