var models = require('../models')
const { tripTransformer, tripsTransformer } = require('../transformers/tripTransformer')
var store = async (req, res, next) => {
    
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }

    var title = req?.body?.title?.trim()
    var cost = Number(req?.body?.cost)
    var date = req?.body?.date?.trim()

    if (!title || title?.length < 3) {
        response.succeess = false
        response.massages.push('The title length should be more than 2')
    }
    if (!cost || cost < 1) {
        response.succeess = false
        response.massages.push('please enter a valid number')
    }
    if (!(/^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|11)(-)([0][1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(02)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02)(-)(29)))(\s([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))$/.test(date))) {
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
    response.data = tripTransformer(newTrip)
    response.massages.push('done')
    res.send(response)
}
var index = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var trips = await await models.Trip.findAll()
    if (Array.isArray(trips)) {
        result.data = tripsTransformer(trips)
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
        result.data = tripTransformer(trip)
    } else {
        res.status(404)
        result.messages.push('Please Provide a valid ID')
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
    var deleted = await models.Trip.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        result.messages.push('Trip has been deleted')
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
    response.data = tripTransformer(updateTrip)
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
