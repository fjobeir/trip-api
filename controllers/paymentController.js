var models = require('../models')

var store = async function(req, res, next) {
    // بده تحسين - وظيفة - homework to improve it
    await models.Payment.create({
        subscriptionId: req.body.subscriptionId,
        amount: req.body.amount,
        date: req.body.date
    })
}

module.exports = {
    store
}