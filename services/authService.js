var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

const authService = {
    hashPassword: function(plainTextPassword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash
    },
    comparePassword: function(plain, hash) {
        return bcrypt.compareSync(plain, hash)
    },
    generateToken: function(id, type) {
        return jwt.sign({
            id: id,
            type: type
        }, '1234567890')
    },
    decryptToken: function(token) {
        return jwt.verify(token, '1234567890')
    }
}

module.exports = authService