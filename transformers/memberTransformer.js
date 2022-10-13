var memberTransformer = function(member) {
    delete member.dataValues.password
    return member
}
var membersTransformer = function(members) {
    return members.map(member => memberTransformer(member))
}

module.exports = {
    membersTransformer,
    memberTransformer
}