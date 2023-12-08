function toResource(rent) {
    return {
        "user_id": rent.user_id,
        "rent_dt": rent.rent_dt,
        "rent_expire": rent.rent_expire,
        "payment_method": rent.payment_method,
        "streaming_rent_id": rent.streaming_rent_id
    };
}

function rentToResource(rent) {
    if (!rent.id && Array.isArray(rent)){
        return rent.map(toResource);
    }
    return toResource(rent);
}

module.exports = rentToResource;