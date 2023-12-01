function toResource(streamingRent) {
    if (!streamingRent.id) {
        return {};
    }
    return {
        "id": streamingRent.id,
        "link": streamingRent.link,
        "price": streamingRent.price,
        "rent_days": streamingRent.rent_days,
        "movie_id": streamingRent.movie_id,
        "source": streamingRent.source
    };
}

function streamingRentToResource(streamingRent) {
    if (!streamingRent) return {};
    if (!streamingRent.id && Array.isArray(streamingRent)){
        return streamingRent.map(toResource);
    }
    return toResource(streamingRent);
}

module.exports = streamingRentToResource;