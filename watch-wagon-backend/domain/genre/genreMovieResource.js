function toResource(genre) {
    if (!genre.id) {
        return {};
    }
    return {
        "id": genre.id,
        "title": genre.title,
        "image": genre.image,
        "name": genre.name
    };
}
function genreToResource(genre) {
    if (!genre) return {};
    if (!genre.id && Array.isArray(genre)){
        return genre.map(toResource);
    }
    return toResource(genre)
}

module.exports = genreToResource;