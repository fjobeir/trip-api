var models = require('../models')

// var store = async function(req, res, next) {
//     await models.Payment.create({
//         subscriptionId: req.body.subscriptionId,
//         amount: req.body.amount,
//         date: req.body.date
//     })
// }

var store = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }

    var subscriptionId = req.body.subscriptionId
    var amount = req.body.amount
    var date = req.body.date.trim()


    if (subscriptionId.length < 0) {
        response.succeess = false
        response.massages.push('subscriptionId is not true')
    }
    if (amount.length < 0) {
        response.succeess = false
        response.massages.push('amount is not true')
    }
    if (date.length < 10) {
        response.succeess = false,
            response.massages.push('date is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }

    var newPayment = await models.Payment.create({
        subscriptionId: subscriptionId,
        amount: amount,
        date: date

    })
    response.data = newPayment
    response.massages.push('done')
    res.send(response)
}
var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var payments = await await models.Payment.findAll()
    if (Array.isArray(payments)) {
        result.data = payments
    } else {
        res.status(404)
        res.success = false
        result.success.push('Please Try again later')
    }
    res.send(result)
}
var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var payment = await models.Payment.findByPk(id)
    if (payment) {
        result.data = payment
    } else {
        res.status(404)
        result.success.push('Please Provide a valid ID')
    }
    res.send(result)
}
var destroy = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.Payment.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
    } else {
        res.status(404)
        result.success.push('Please try again')
    }
    res.send(result)
}
var update = async (req, res, next) => {

    var response = {
        succeess: true,
        massages: [],
        data: {}
    }

    var subscriptionId = req.body.subscriptionId
    var amount = req.body.amount
    var date = req.body.date.trim()


    if (subscriptionId.length < 0) {
        response.succeess = false
        response.massages.push('subscriptionId is not true')
    }
    if (amount.length < 0) {
        response.succeess = false
        response.massages.push('amount is not true')
    }
    if (date.length < 10) {
        response.succeess = false,
            response.massages.push('date is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }

    var id = req.params.id
    var updatePayment = await models.Payment.update({
        subscriptionId: subscriptionId,
        amount: amount,
        date: date
    }, {
        where: {
            id
        }
    })
    response.data = updatePayment
    response.massages.push('done')
    res.send(response)
}

module.exports = {
    store,
    index,
    show,
    destroy,
    update
}