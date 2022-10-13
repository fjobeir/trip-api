var bcrypt = require('bcryptjs')
var models = require('../models')
var authService = require('../services/authService')
var {memberTransformer, membersTransformer} = require('../transformers/memberTransformer')

var store = async function (req, res, next) {
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
    var memberPhotos = []
    if (req.files.length) {
        for (var i =0; i < req.files.length; i++) {
            memberPhotos.push({
                file: req.files[i].filename
            })
        }
    }
    password = authService.hashPassword(password)
    var [member, created] = await models.Member.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            // email: email,
            phone: phone,
            gender: gender,
            password: password
        },
        include: [models.Photo]
    })
    if (created) {
        result.messages.push('Member has been created successfully')
    } else {
        result.success = false
        result.messages.push('You are already registered')
    }
    result.data = memberTransformer(member)
    res.send(result)
}
var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var member = await models.Member.findByPk(id, {
        include: [
            models.Trip
        ]
    })
    if (member) {
        result.data = memberTransformer(member)
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
    var members = await models.Member.findAll()
    if (Array.isArray(members)) {
        result.data = membersTransformer(members)
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
    var deleted = await models.Member.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        res.status(200)
        result.messages.push('Member has been deleted')
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
    var id = req.params.id
    var updatedMember = await models.Member.update({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password
    }, {
        where: {
            id
        }
    })
    result.data = memberTransformer(updatedMember)
    result.messages.push('Member has been updated successfully')
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
    var loggedMember = await models.Member.findOne({
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
    if (loggedMember) {
        result.data = memberTransformer(loggedMember),
        result.token = authService.generateToken(loggedMember.id, 'member')
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