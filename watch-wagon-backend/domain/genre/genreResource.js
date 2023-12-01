function toResource(genre) {
    if (!genre.id) {
        return {};
    }
    return {
        "id": genre.id,
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