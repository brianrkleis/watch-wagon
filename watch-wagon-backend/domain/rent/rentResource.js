function toResource(rent) {
    if (!rent.id) {
        return {};
    }
    return {
        "id": rent.id,
        "user_id": rent.user_id,
        "rent_dt": rent.rent_dt,
        "rent_expire": rent.rent_expire,
        "payment_method": rent.payment_method,
        "streaming_rent": rent.streaming_rent
    };
}

function rentToResource(rent) {
    if (!rent) return {};
    if (!rent.id && Array.isArray(rent)){
        return rent.map(toResource);
    }
    return toResource(rent);
}

module.exports = rentToResource;