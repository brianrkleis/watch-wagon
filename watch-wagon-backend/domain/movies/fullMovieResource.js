function toResource(movies) {
    if (!movies.id) {
        return {};
    }
    return {
        "id": movies.id,
        "title": movies.title,
        "duration": movies.duration,
        "year": movies.year,
        'director': movies.director,
        "description": movies.description,
        "casting": movies.casting,
        "image": movies.image,
        "genres": movies.genres,
        "streamings": movies.streamings
    };
}
function moviesToResource(movies) {
    if (!movies) return {};
    if (!movies.id && Array.isArray(movies)){
        return movies.map(toResource);
    }
    return toResource(movies)
}

module.exports = moviesToResource;