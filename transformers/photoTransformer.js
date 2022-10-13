var photoTransformer = function(photo) {
    photo.file = 'http://localhost:3000/uploads/' + photo.file
    return photo
}
var photosTransformer = function(photos) {
    return photos.map(photo => photoTransformer(photo))
}

module.exports = {
    photoTransformer,
    photosTransformer
}