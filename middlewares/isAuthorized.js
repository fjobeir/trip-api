var isAuthorized = function(req, res, next) {
    if (req.user.type == 'admin' || (req.user.type == 'member' && req.user.id == req.params.id)) {
        return next()
    }
    res.status(403)
    res.send({
        success: false,
        messages: ['You do not have permission to perform this action']
    })
}

module.exports = isAuthorized