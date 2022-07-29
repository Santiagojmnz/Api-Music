const jwt = require('jsonwebtoken');
const { SECRET } = require('../Config/config')

const createToken = (payload) => {
    return jwt.sign({ data: payload }, SECRET, { expiresIn: '30d' });
}

const tokenData = (token) => {
    const decode = jwt.verify(token, SECRET);
    return decode;

}

module.exports = {
    createToken,
    tokenData

}