var models = require('../models')

var store = async function (req, res, next) {
    // بده تحسين - وظيفة - homework to improve it
    // await models.Subscription.create({
    //     memberId: req.body.memberId,
    //     tripId: req.body.tripId
    // })
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }

    var memberId = req.body.memberId
    var tripId = req.body.tripId


    if (memberId < 1) {
        response.succeess = false
        response.massages.push('memberId is not true')
    }
    if (tripId < 1) {
        response.succeess = false
        response.massages.push('tripId is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }

    var newSub = await models.Subscription.create({
        memberId: memberId,
        tripId: tripId

    })
    response.data = newSub
    response.massages.push('done')
    res.send(response)
}
var show = async function (req, res, next) {
    // var abdulmalek = await models.Subscription.findByPk(req.params.id, {
    //     include: [
    //         models.Payment
    //     ]
    // })
    // res.send(abdulmalek)
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var subscription = await models.Subscription.findByPk(id, {
        include: [
            models.Payment
        ]
    })
    if (subscription) {
        result.data = subscription
    } else {
        res.status(404)
        result.success.push('Please Provide a valid ID')
    }
    res.send(result)
}
var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var subs = await models.Subscription.findAll({
        include: [
            models.Payment
        ]
    })
    if (Array.isArray(subs)) {
        result.data = subs
    } else {
        res.status(404)
        res.success = false
        result.success.push('Please Try again later')
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
    var deleted = await models.Subscription.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        // result.data=subscription
    } else {
        res.status(404)
        result.success.push('Please try again')
    }
    res.send(result)
}
var update = async function (req, res, next) {
    var response = {
        success: true,
        massages: [],
        data: {}
    }
    var memberId = req.body.memberId
    var tripId = req.body.tripId


    if (memberId.length < 0) {
        response.success = false
        response.massages.push('memberId is not true')
    }
    if (tripId.length < 0) {
        response.success = false
        response.massages.push('tripId is not true')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateSub = await models.Subscription.update({
        memberId: memberId,
        tripId: tripId
    }, {
        where: {
            id
        }
    })
    response.data = updateSub
    response.massages.push('Subscription has been update created successfully')
    res.send(response)
}

module.exports = {
    store,
    show,
    index,
    destroy,
    update
}