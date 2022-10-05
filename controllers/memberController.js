var models = require('../models')

var store = async function(req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    var name = req.body.name.trim()
    var email = req.body.email.trim()
    var phone = req.body.phone.trim()
    var gender = req.body.gender
    var password = req.body.password.trim()
    if (name.length < 3) {
        result.success = false
        result.messages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false
        result.messages.push('Please check your email')
    }
    if (phone.length < 3) {
        result.success = false
        result.messages.push('Please check your phone')
    }
    if (password.length < 3) {
        result.success = false
        result.messages.push('Please check your password')
    }
    if (gender != '0' && gender != '1') {
        result.success = false
        result.messages.push('Please check your gender')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var newMember = await models.Member.create({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password
    })
}

module.exports = {
    store
}