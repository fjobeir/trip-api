var models = require('../models')
var store = async (req, res, next) => {
    
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }

    var title = req.body.title.trim()
    var cost = req.body.cost.trim()
    var date = req.body.date.trim()


    if (title.length < 3) {
        response.succeess = false
        response.massages.push('title is not true')
    }
    if (cost.length < 0) {
        response.succeess = false
        response.massages.push('please enter a valid number')
    }
    if (date.length < 10) {
        response.succeess = false,
            response.massages.push('please check your date')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }

    var tripPhotos = []
    if (req.files.length) {
        for (var i = 0; i < req.files.length; i++) {
            tripPhotos.push({
                file: req.files[i].filename
            })
        }
    }
    var newTrip = await models.Trip.create({
        title: title,
        cost: cost,
        date: date,
        Photos: tripPhotos
    }, {
        include: models.Photo
    })
    response.data = newTrip
    response.massages.push('done')
    res.send(response)
}
var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var trips = await await models.Trip.findAll()
    if (Array.isArray(trips)) {
        result.data = trips
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
    
    var trip = await models.Trip.findByPk(req.params.id, {
        include: [
            models.Member,
            models.Photo
        ]
    })
    if (trip) {
        result.data = trip
    } else {
        res.status(404)
        result.messages.push('Please Provide a valid ID')
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
    var deleted = await models.Trip.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        // result.data=trip
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

    var title = req.body.title.trim()
    var cost = req.body.cost.trim()
    var date = req.body.date.trim()


    if (title.length < 3) {
        response.succeess = false,
            response.massages.push('please check your title')
    }
    if (cost.length < 0) {
        response.succeess = false,
            response.massages.push('please enter a valid number')
    }
    if (date.length < 10) {
        response.succeess = false,
            response.massages.push('please check your date')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }

    var id = req.params.id
    var updateTrip = await models.Trip.update({
        title: title,
        cost: cost,
        date: date,
    }, {
        where: {
            id
        }
    })
    response.data = updateTrip
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
