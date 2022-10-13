const { membersTransformer } = require("./memberTransformer")

var tripTransformer = function(trip) {
    if (trip.Members) {
        trip.Members = membersTransformer(trip.Members)
    }
    return trip
}
var tripsTransformer = function(trips) {
    return trips.map(trip => tripTransformer(trip))
}

module.exports = {
    tripTransformer,
    tripsTransformer
}