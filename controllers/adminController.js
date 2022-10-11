var models = require('../models')
var authService = require('../services/authService')

var store = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    var name = req.body.name.trim()
    var email = req.body.email.trim()
    var password = req.body.password.trim()
    if (name.length < 3) {
        result.success = false
        result.messages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false
        result.messages.push('Please check your email')
    }
    if (password.length < 3) {
        result.success = false
        result.messages.push('Please check your password')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    password = authService.hashPassword(password)
    var [admin, created] = await models.Admin.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            password: password
        }
    })
    if (created) {
        result.messages.push('Admin has been created successfully')
    } else {
        result.success = false
        result.messages.push('You are already registered')
    }
    result.data = admin
    res.send(result)
}
var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var admin = await models.Admin.findByPk(id, {
        include: [
            models.Trip
        ]
    })
    if (admin) {
        result.data = admin
    } else {
        res.status(404)
        result.success = false
        result.messages.push('Please provide a valid ID')
    }
    res.send(result)
}
var index = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var admins = await models.Admin.findAll()
    if (Array.isArray(admins)) {
        result.data = admins
    } else {
        res.status(404)
        res.success = false
        res.messages.push('Please try again later')
    }
    res.send(result)
}
var destroy = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.Admin.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        res.status(200)
        result.messages.push('Admin has been deleted')
    } else {
        res.status(404)
        result.success = false
        result.messages.push('Please provide a valid ID')
    }
    res.send(result)
}

var update = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {}
    }
    var name = req.body.name.trim()
    var email = req.body.email.trim()
    var password = req.body.password.trim()
    if (name.length < 3) {
        result.success = false
        result.messages.push('Please check your name')
    }
    if (email.length < 3) {
        result.success = false
        result.messages.push('Please check your email')
    }
    if (password.length < 3) {
        result.success = false
        result.messages.push('Please check your password')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    var id = req.params.id
    var updatedAdmin = await models.Admin.update({
        name: name,
        email: email,
        password: password
    }, {
        where: {
            id
        }
    })
    result.data = updatedAdmin
    result.messages.push('Admin has been updated successfully')
    res.send(result)
}

var login = async function (req, res, next) {
    var result = {
        success: true,
        messages: [],
        data: {},
        token: null
    }
    var email = req.body.email.trim()
    var password = req.body.password.trim()
    var loggedAdmin = await models.Admin.findOne({
        where: {
            email: email,
        }
    }).then((user) => {
        if (!user) {
            return false
        } else {
            if (authService.comparePassword(password, user.password)) {
                return user
            } else {
                return false
            }
        }
    })
    if (loggedAdmin) {
        result.data = loggedAdmin,
        result.token = authService.generateToken(loggedAdmin.id, 'admin')
    } else {
        result.success = false
        result.messages.push('Wrong email or password')
    }
    res.send(result)
}

module.exports = {
    store,
    show,
    index,
    destroy,
    update,
    login
}