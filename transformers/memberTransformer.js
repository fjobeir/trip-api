var memberTransformer = function(member) {
    if (member?.dataValues?.password) {
        delete member?.dataValues?.password
    }
    if (member?.Photos) {
        member.Photos = photosTransformer(member.Photos)
    }
    return member
}
var membersTransformer = function(members) {
    return members.map(member => memberTransformer(member))
}

module.exports = {
    membersTransformer,
    memberTransformer
}