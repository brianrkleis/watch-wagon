function toResource(movies) {
    if (!movies.id) {
        return {};
    }
    return {
        "id": movies.id,
        "title": movies.title,
        "duration": movies.duration,
        "casting": movies.casting,
        'director': movies.director,
        "description": movies.description,
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