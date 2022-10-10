var models = require('../models')

var store = async function(req, res, next) {
    // بده تحسين - وظيفة - homework to improve it
    await models.Subscription.create({
        memberId: req.body.memberId,
        tripId: req.body.tripId
    })
}
var show = async function(req, res, next) {
    var subscription = await models.Subscription.findByPk(req.params.id, {
        include: [
            models.Payment
        ]
    })
    res.send(subscription)
}

module.exports = {
    store,
    show
}