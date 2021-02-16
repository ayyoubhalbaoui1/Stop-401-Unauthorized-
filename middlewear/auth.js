const { NotExtended } = require('http-errors')
const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send('can\'t access')
    }
    try {
        const decodeToken = jwt.verify(token, 'PrivateKey')
        next()
    } catch (err) {
        res.status(404).send('error Token');
    }
}